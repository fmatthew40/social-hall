const { Thought, User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts', 
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getUsersById({ params }, res) {
        User.findOne({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id! '});
                return; 
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json(err); 
        });
    },

    addNewUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User not found!'}); 
                return; 
            }
            res.json(dbUserData); 
        })
        .catch(err => res.status(400).json(err)); 
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User not found!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    addNewFriend({ params }, res) {
        // console.log(body);
        User.findOneAndUpdate(
            { _id: params.id},
            { $addToSet: { friends: params.friendId }},
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found!'});
                return; 
            }
            res.json(dbUserData); 
        })
        .catch(err => res.json(err));
    },

    deleteFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id }, 
            { $pull: { friends: params.friendId }},
            { new: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User not found!'});
                return; 
            }
            res.json(dbUserData); 
        })
        .catch(err => res.json(err));
    }

}

  



module.exports = userController;