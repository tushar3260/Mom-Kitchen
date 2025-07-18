import Order from "../models/Order.js";
import {io} from '../server.js'
// ✅ Place a New Order


export const placeOrder = async (req, res) => {
  try {
    const {
      userId,
      chefId,
      meals,
      totalPrice,
      deliveryAddress,
      paymentMode,
      timeSlot
    } = req.body;

    // ✅ Required fields validation
    if (
      !userId ||
      !chefId ||
      !Array.isArray(meals) ||
      meals.length === 0 ||
      !totalPrice ||
      !deliveryAddress
    ) {
      return res.status(400).json({
        message: "Missing required fields",
        required: ["userId", "chefId", "meals", "totalPrice", "deliveryAddress"]
      });
    }

    // ✅ Create and save the order
    const order = new Order({
      userId,
      chefId,
      meals,
      totalPrice,
      deliveryAddress,
      paymentMode,
      timeSlot,
      status: "Placed",
      paymentStatus: "Pending"
    });

    await order.save();

    // ✅ Emit event to specific chef's room
    io.to(`chef:${chefId}`).emit("newOrder", {
      message: "You have a new order",
      order
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Error placing order", error: err.message });
  }
};


// ✅ Get All Orders (Admin/Support)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("chefId", "name email")
      .populate("meals.mealId", "title price");

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

// ✅ Get Orders by User ID
export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("meals.mealId", "title price")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user orders", error: err.message });
  }
};

// ✅ Get Single Order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email")
      .populate("chefId", "name email")
      .populate("meals.mealId", "title price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order", error: err.message });
  }
};

// ✅ Update Order Status (Admin/Chef use)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    // ✅ Validate enums if needed
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order updated", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: "Error updating order", error: err.message });
  }
};
export const getOrderbyChefId = async (req, res) => {
  try {
    const { chefId } = req.params;
    const orders = await Order.find({ chefId })
      .populate("userId", "name email")
      .populate("meals.mealId", "title price");
      if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};