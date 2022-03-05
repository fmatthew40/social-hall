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
  User.findOneAndUpdate({ _id: params.id }, body, { new: true })
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
  User.findOneAndDelete({ _id: params.id })
  .then(dbThoughtData => {
      if (!dbThoughtData) {
          res.status(404).json({ message: 'Thought not found!' });
          return;
      }
      res.json(dbThoughtData);
  })
  .catch(err => res.status(400).json(err));
},

};

module.exports = thoughtController;
