const Comment = require('../models/Comment');

// Get all comments for a product
exports.getCommentsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await Comment.find({ productId });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

// Add a new comment
exports.addComment = async (req, res) => {
  try {
    const { productId, text, user } = req.body;

    // Validate required fields
    if (!productId || !text || !user) {
      return res.status(400).json({ 
        message: 'All fields (productId, text, user) are required.' 
      });
    }

    // Create a new comment
    const newComment = new Comment({
      productId,
      text,
      user,
      createdAt: new Date(),
    });

    // Save to database
    await newComment.save();
    res.status(201).json({ 
      message: 'Comment added successfully', 
      comment: newComment 
    });
  } catch (error) {
    console.error('Error adding comment:', error);

    // Return a user-friendly error message
    res.status(500).json({ 
      message: 'Failed to add comment. Please try again later.' 
    });
  }
};
// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting comment' });
  }
};