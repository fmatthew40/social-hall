const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: 'Please enter a valid username!'
    },
    email: {
        type: String,
        required: 'Please enter your email address!',
        unique: true,
        match: [/.+\@.+\..+/]
    },
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    },
],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ]
},
{   
    toJSON: {
        virtuals: true
    },
        id: false
}
);

// friend count virtual
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length; 
})

const User = model('User', UserSchema);

module.exports = User; 