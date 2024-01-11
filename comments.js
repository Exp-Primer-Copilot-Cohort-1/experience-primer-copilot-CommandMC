// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Create route to handle comment creation
app.post('/posts/:id/comments', (req, res) => {
    // Generate a random id for comment
    const commentId = randomBytes(4).toString('hex');
    // Extract comment content from request body
    const { content } = req.body;

    // Get comments for post id from comments object
    const comments = commentsByPostId[req.params.id] || [];

    // Push new comment to comments array
    comments.push({ id: commentId, content });

    // Add comments array to comments object
    commentsByPostId[req.params.id] = comments;

    // Return status 201 and comments array
    res.status(201).send(comments);
});

// Create route to handle comments fetch
app.get('/posts/:id/comments', (req, res) => {
    // Return comments array for post id
    res.send(commentsByPostId[req.params.id] || []);
});

// Listen on port 4001
app.listen(4001, () => {
    console.log('Listening on 4001');
});