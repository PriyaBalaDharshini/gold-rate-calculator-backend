import mongoose from "mongoose";

const goldRateSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    ratePerGram: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    }
})

const GoldRate = mongoose.model("goldrate", goldRateSchema);
export default GoldRate;