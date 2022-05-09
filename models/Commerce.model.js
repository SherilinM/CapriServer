const { Schema, model } = require("mongoose");

const commerceSchema = new Schema(

    {
        title: String,
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'mi titulo']
        },
        description: {
            type: String,
            required: [true, 'esta es mi descripcion'],
        },
        imageUrl: {
            type: String,
            required: [true, 'mi imagen']
        },
        category: String,
        address: {
            location: {
                type: {
                    type: String
                },
                coordinates: [Number],
                // required: [true, 'direccion']
            }
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        like: Number
    },

    {
        timestamps: true
    }
)


const Commerce = model("Commerce", commerceSchema);

module.exports = Commerce;