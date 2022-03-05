const router = require('express').Router();

// const { User } = require('express').Router();

const {
    getAllUsers,
    getUsersById,
    addNewUser,
    updateUser,
    deleteUser,
    addNewFriend
    

} = require('../../controllers/user-controller')
// user routes
router
    .route('/')
    .get(getAllUsers)
    .post(addNewUser)
// user routes
router
    .route('/:id')
    .get(getUsersById)
    .put(updateUser)
    .delete(deleteUser);
// friend routes
router
    .route("/:id/friends/:friendId")
    .post(addNewFriend)
    // .delete(removeFriend);


    module.exports = router;