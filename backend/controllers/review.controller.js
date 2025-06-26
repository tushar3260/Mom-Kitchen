import Review from "../models/Review.js";

// 👉 Create review
export const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 👉 Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "name")
      .populate("chefId", "name")
      .populate("orderId");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

// 👉 Get reviews for a specific chef
export const getReviewsByChef = async (req, res) => {
  try {
    const reviews = await Review.find({ chefId: req.params.chefId })
      .populate("userId", "name")
      .populate("orderId");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chef reviews" });
  }
};

// 👉 Delete a review
export const deleteReview = async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Review not found" });
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting review" });
  }
};
