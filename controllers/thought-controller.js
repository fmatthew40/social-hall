const { Thought, User } = require('../models');

const thoughtController = {

  getThoughts(req, res) {
    Thought.find({})
    .populate({
      path: 'reactions',
      select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id! '});
            return; 
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err); 
        res.status(400).json(err); 
    });
},

addNewThought({ body }, res) {
  Thought.create(body)
  .then(({ _id }) => {
    return User.findOneAndUpdate(
      { _id: body.userId },
      { $push: { thoughts: _id }},
      { new: true }
    )
  })
  .then(dbThoughtData => {
    if (!dbThoughtData) {
      res.status(404).json({ message: 'User not found!'})  
      return;  
     }
     res.json(dbThoughtData);
  })
  .catch(err => {
    res.status(400).json(err);
  })
},

updateThought({ params, body }, res) {
  Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
  .then(dbThoughtData => {
      if (!dbThoughtData) {
          res.status(404).json({ message: 'Thought not found!'}); 
          return; 
      }
      res.json(dbThoughtData); 
  })
  .catch(err => res.status(400).json(err)); 
},

deleteThought({ params }, res) {
  Thought.findOneAndDelete({ _id: params.id })
  .then(dbThoughtData => {
      if (!dbThoughtData) {
          res.status(404).json({ message: 'Thought not found!' });
          return;
      }
      res.json(dbThoughtData);
  })
  .catch(err => res.status(400).json(err));
},

postReaction({ params, body }, res) {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $push: {reactions: body }},
    { new: true }
  )
  .then(dbReactionData => {
    if (!dbReactionData) {
      res.status(404).json({ message: 'Not found!'});
      return; 
    }
    res.json(dbReactionData);
  })
  .catch(err => res.json(err));
},

deleteReaction({ params }, res) {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: { reactionId: params.reactionId }}},
    { new: true }
  )
  .then(dbReactionData => res.json(dbReactionData))
  .catch(err => res.json(err));
}

};

module.exports = thoughtController;
