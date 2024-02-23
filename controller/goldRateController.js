
import goldRateModel from '../model/goldRateModel.js'

/* Adding Gold rate */

const addGoldRate = async (req, res) => {
    const { date, ratePerGram, currency } = req.body
    try {
        const goldRate = await goldRateModel.create({ date, ratePerGram, currency });
        res.status(200.).send({
            message: "Details added",
            goldRate
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

/* Get all gold rates */
const getAllGoldRates = async (req, res) => {
    try {
        const goldRates = await goldRateModel.find();
        res.status(200).send({
            message: "All gold rates retrieved successfully",
            goldRates
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
};

export default { addGoldRate, getAllGoldRates }