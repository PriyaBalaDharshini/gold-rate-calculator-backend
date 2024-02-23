import userModel from "../model/userModel.js";
import auth from "../helper/auth.js";
import randomstring from 'randomstring';
import nodemailer from 'nodemailer'

/* adding user */
const addUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            req.body.password = await auth.createHash(req.body.password);
            let newUser = await userModel.create(req.body);
            console.log(newUser);
            res.status(200).send({
                message: "User Added Successfully!",
            });
        } else {
            res.status(401).send({
                message: `User already exists with ${req.body.email}`
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

/* For getting all the users */
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send({
            message: "All users fetched Successfully",
            users
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await userModel.findOne({ email: email });
        /* hasing the password and comparing it */
        if (user) {
            const passwordMatch = await auth.hashCompare(password, user.password)
            if (passwordMatch) {
                const token = await auth.createToken({
                    name: user.name,
                    email: user.email
                })
                res.status(200).send({
                    message: "Login successful",
                    token
                })
            } else {
                res.status(400).send({
                    message: "Incorrect Password"
                })
            }
        }
        else {
            res.status(400).send({
                message: "User not found"
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email: email });
        console.log(email);
        if (user) {
            let randomString = randomstring.generate(20);
            console.log(randomString);
            let link = `https://stellar-pudding-bbd874.netlify.app/reset-password/${randomString}`
            console.log(link);

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                }
            });
            let message = {
                from: process.env.EMAIL,
                to: user.email,
                subject: "Store Password reset link",
                text: `Activation link : ${link}`,
            };

            transporter.sendMail(message).then(() => {
                console.log("received email");
                res.status(200).send({ message: "Reset link send to mail. Please check Inbox or Spam" })
            }).catch(error => { console.log("Message:" + error) })

            user.token = randomString;
            await user.save();

        } else {
            return res.status(404).send({
                message: "User not found",
            });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { password, token } = req.body;
        console.log(password, token);
        let user = await userModel.findOne({ token });
        console.log(user);
        user.password = await auth.createHash(password);
        user.token = "";
        await user.save();

        res.status(200).send({
            message: "Password reset successfull"
        })

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    }
};




export default { addUser, logIn, getAllUsers, forgotPassword, resetPassword }