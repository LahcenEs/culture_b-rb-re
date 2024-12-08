const express = require('express');
const commentController = require('../controllers/CommentController');
const router = express.Router();

// Get comments for a specific product


// Add a new comment
router.post('/api/comments/:id', async (req, res) => {
    try {
      const { text } = req.body;
      const { id } = req.params;
  
      const newComment = new Comment({ text, productId: id });
      const savedComment = await newComment.save();
      res.status(201).json(savedComment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add comment' });
    }
  });
  

// Delete a comment


module.exports = router;