const amqp = require("amqplib");
const Order = require("../models/order");

const exchange = "order_exchange";

const userValidationRes = 'user_validation_response';
const userValidationReq = 'user_validation_request';

const routingKeyUserReq = 'user.validation.request';
const routingKeyUserRes = 'user.validation.response';

async function publishOrderCreated(order) {
  const connection = await amqp.connect("amqp://rabbitmq");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, "topic", { durable: true });

  // Check user validation 
  const validationRequest = {
    orderId: order._id,
    username: order.customerName
  }
  channel.publish(
    exchange,
    routingKeyUserReq,  
    Buffer.from(JSON.stringify(validationRequest))
  );
}

async function consumeMessages() {
    // Creation des queues et de l'exchange
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();
    await channel.assertExchange(exchange, "topic", { durable: true });
    
    await channel.assertQueue(userValidationRes, { durable: true });
    await channel.assertQueue(userValidationReq, { durable: true });

    await channel.bindQueue(userValidationRes, exchange, routingKeyUserRes);
    await channel.bindQueue(userValidationReq, exchange, routingKeyUserReq);

    console.log("Waiting for UserValidationResponse messages...");

    // Consumer for user validation response
    channel.consume(userValidationRes, async (msg) => {
        const response = JSON.parse(msg.content.toString());
        console.log("Received User Validation Response", response);

        // Handle user validation response
        if (!response.isValid) {
            console.log(`User ${response.username} failed validation !`);
            await Order.findByIdAndDelete(response.orderId);
            console.log(`Order ${response.orderId} deleted !`);
        } else {
            try {
            let orderId = response.orderId;
            // Update the order status to "Shipped"
            const updatedOrder = await Order.findByIdAndUpdate(
                orderId,
                { status: "Shipped" },
                { new: true } // Return the updated document
            );

            if (!updatedOrder) {
                console.error(`Order ${orderId} not found.`);
            } else {
                console.log(`Order ${orderId} status updated to "Shipped".`);
            }
          } catch (error) {
              console.error(`Error updating order status for ${orderId}:`, error.message);
          }
        }
        
        channel.ack(msg);
    });
}

module.exports = {
  publishOrderCreated,
  consumeMessages
};