import Subscription from '../models/subscription.js';

// 👉 Create Subscription
export const createSubscription = async (req, res) => {
  try {
    const {
      userId,
      chefId,
      plan,
      selectedMeals,
      startDate,
      endDate,
      status,
      autoRenew,
      totalAmount
    } = req.body;

    // Required fields validation
    if (!userId || !chefId || !plan || !startDate) {
      return res.status(400).json({
        message: "Missing required fields: userId, chefId, plan, startDate are required"
      });
    }

    // Validate plan enum
    if (!["Weekly", "Monthly"].includes(plan)) {
      return res.status(400).json({ message: "Invalid plan. Allowed: Weekly, Monthly" });
    }

    // Validate status enum if provided
    if (status && !["Active", "Paused", "Cancelled", "Expired"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Validate selectedMeals structure (basic)
    if (selectedMeals && !Array.isArray(selectedMeals)) {
      return res.status(400).json({ message: "selectedMeals must be an array" });
    }

    const subscription = new Subscription({
      userId,
      chefId,
      plan,
      selectedMeals,
      startDate,
      endDate,
      status: status || "Active",
      autoRenew: autoRenew || false,
      totalAmount
    });

    await subscription.save();

    res.status(201).json({
      message: "Subscription created successfully",
      subscription
    });

  } catch (err) {
    res.status(500).json({ message: "Failed to create subscription", error: err.message });
  }
};

// 👉 Get All Subscriptions
export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate("userId", "name email")
      .populate("chefId", "name email cuisine")
      .populate("selectedMeals.mealId", "title description price");

    res.status(200).json(subscriptions);

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subscriptions", error: err.message });
  }
};

// 👉 Get Subscription by ID
export const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)
      .populate("userId", "name email")
      .populate("chefId", "name email cuisine")
      .populate("selectedMeals.mealId", "title description price");

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(200).json(subscription);

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subscription", error: err.message });
  }
};

// 👉 Update Subscription
export const updateSubscription = async (req, res) => {
  try {
    const updates = req.body;

    if (updates.plan && !["Weekly", "Monthly"].includes(updates.plan)) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    if (updates.status && !["Active", "Paused", "Cancelled", "Expired"].includes(updates.status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    )
      .populate("userId", "name email")
      .populate("chefId", "name email cuisine")
      .populate("selectedMeals.mealId", "title description price");

    if (!updatedSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(200).json({
      message: "Subscription updated",
      subscription: updatedSubscription
    });

  } catch (err) {
    res.status(500).json({ message: "Failed to update subscription", error: err.message });
  }
};

// 👉 Delete Subscription
export const deleteSubscription = async (req, res) => {
  try {
    const deleted = await Subscription.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(200).json({ message: "Subscription deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Failed to delete subscription", error: err.message });
  }
};
