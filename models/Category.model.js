const { Schema, model } = require("mongoose");

const categorySchema = new Schema(

    {
        name: String,
    },
    {
        timestamps: true
    }
)

const Category = model("category", categorySchema);

module.exports = Category;