const { Schema, model } = require("mongoose");

const commentSchema = new Schema({

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commerce: {
        type: Schema.Types.ObjectId,
        ref: 'Commerce'
    },
    comment: String
},
    {
        timestamps: true
    }
)




const Comment = model("Comment", commentSchema);

module.exports = Comment;