const router = require('express').Router();

// const { User } = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    addNewThought,
    updateThought,
    deleteThought
    

} = require('../../controllers/thought-controller')

// thought routes
router
    .route('/')
    .get(getThoughts)
// thought routes connected to thought Id
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// thought routes connected to user ids
router
    .route('/:userId')
    .post(addNewThought)

module.exports = router;