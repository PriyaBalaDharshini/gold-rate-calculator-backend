import express from 'express'
import userController from '../controller/userController.js'
import goldRateController from '../controller/goldRateController.js'

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send(
        `<h1>Welcome</h1>`)
})

router.post("/add-user", userController.addUser)
router.post("/login", userController.logIn)
router.get("/all-users", userController.getAllUsers)
router.post("/forgot-password", userController.forgotPassword);
router.put("/reset-password", userController.resetPassword);


router.post("/add-goldrate", goldRateController.addGoldRate)
router.get("/goldrate", goldRateController.getAllGoldRates);
router.post("/get-rate", goldRateController.getRate)
router.get("/full-data", goldRateController.fullData)

export default router