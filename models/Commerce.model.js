const { Schema, model } = require("mongoose");

const commerceSchema = new Schema(

    {
        title: String,
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'My owner']
        },
        description: {
            type: String,
            required: [true, 'Description'],
        },
        location: {
            type: {
                type: String,
            },
            coordinates: [Number]
        },
        imageUrl: {
            type: String,
            required: [true, 'Image']
        },
        category: String,
        address: {
            location: {
                type: {
                    type: String
                },
                coordinates: [Number]
            }
        },
        like: Number
    },

    {
        timestamps: true
    }
)


const Commerce = model("Commerce", commerceSchema);
Commerce.syncIndexes()
module.exports = Commerce;