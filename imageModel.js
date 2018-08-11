const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    user: { type: String },
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, require: true },
        created_at: { type: Date, default: new Date() }
    }],
    imageUrl: { type: String, required: true },
    description: { type: String },
    owner: { type: Schema.type.ObjectId, ref: 'User' }
}, {
        timestamps: true
    });

module.exports = mongoose.model("image", ImageSchema);