
import goldRateModel from '../model/goldRateModel.js'
import data from '../info/data.js';


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

const getRate = (req, res) => {
    try {
        data.map((ele => {
            if (ele.date === req.body.selectDate) {
                res.status(200).send(ele)
            }
        }))
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

const fullData = async (req, res) => {
    try {
        res.send(data)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

export default { addGoldRate, getAllGoldRates, getRate, fullData }