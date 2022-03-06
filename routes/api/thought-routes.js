const router = require('express').Router();

// const { User } = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    addNewThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction
} = require('../../controllers/thought-controller')

// thought routes
router
    .route('/')
    .get(getThoughts)
// thought routes connected to thought Id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// thought routes connected to user ids
router
    .route('/:userId')
    .post(addNewThought)
// routes for reactions
router
    .route('/:thoughtId/reactions')
    .post(postReaction)
    .delete(deleteReaction)

module.exports = router;