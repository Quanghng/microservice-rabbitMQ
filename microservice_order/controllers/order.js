const Order = require("../models/order");
const { publishOrderCreated } = require("../services/mqService.js");

// Ajouter une commande
exports.addOrder = async (req, res) => {
    try {
        const { customerName, items, totalAmount } = req.body;

        const newOrder = new Order({
            customerName,
            items,
            totalAmount,
        });

        await newOrder.save();
        await publishOrderCreated(newOrder);
        res.status(201).json({ message: "Commande ajoutée avec succès", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout de la commande", error: error.message });
    }
};

// Récupérer toutes les commandes
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des commandes", error: error.message });
    }
};

// Modifier le statut d'une commande
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Commande introuvable" });
        }

        res.status(200).json({ message: "Statut de la commande mis à jour", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la commande", error: error.message });
    }
};

// Récupérer le détail d'une commande
exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: "Commande introuvable" });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la commande", error: error.message });
    }
};
