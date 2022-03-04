const { Schema, model } = require('mongoose');

// add a date formatter path here


const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        // , ?  
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        Required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // getter method to format timestamp
    }
    },
{
    toJSON: {
        getters: true,
    }
    
    }
    )

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    }, 
    createdAt: {
        type: Date,
        default: Date.now,
        // Use a getter method to format the timestamp on query
    },
    username: {
        type: String, 
        required: true
    }, 
    reactions: [ReactionSchema]
    },
    {
    toJSON: {
    virtuals: true,
    getters: true
    },
    id: false
    }
    );

    ThoughtSchema.virtual('reactionCount').get(function() {
        return this.reactions.length; 
    });

    const Thought = model('Thought', ThoughtSchema);

    module.exports = Thought;