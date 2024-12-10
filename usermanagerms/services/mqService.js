const amqp = require('amqplib');
const User = require("../models/User");

async function consumeMessages() {
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();
    const queue = 'user_validation_request';
    const exchange = "order_exchange";

    await channel.assertQueue(queue, { durable: true });

    console.log("Waiting for UserValidationRequest messages...");

    channel.consume(queue, async (msg) => {
        const request = JSON.parse(msg.content.toString());
        console.log("Received UserValidationRequest", request);

        const isValid = await validateUser(request.username);

        const response = {
            orderId: request.orderId,
            userId: request.username,
            isValid
        };

        channel.publish(
          exchange,
          "user.validation.response",  // Routing key for user validation check
          Buffer.from(JSON.stringify(response))
        );

        console.log("UserValidationResponse sent", response);
        channel.ack(msg);
    });
}

async function validateUser(username) {
    const user = await findUserByName(username);
    return !!user;
}

const findUserByName = async (username) => {
  try {
    console.log("Finding user:", username)
    const user = await User.findOne({ name: username });
    if (!user) {
      console.log(`User ${user} doesn't exist!`)
    }
    return user;
  } catch (error) {
    console.error("Error finding user by name:", error);
    throw error;
  }
};

module.exports = {
  consumeMessages,
};