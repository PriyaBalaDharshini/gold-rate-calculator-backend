import mongoose from 'mongoose'

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username is mandatory to fill"]
    },
    phone: {
        type: String,
        required: [true, "Phone Number is mandatory to fill"],
        min: [10, "please enter valid phone number"]
    },
    email: {
        type: String,
        required: [true, "Email is mandatory to fill"],
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is not a valid email `

        }
    },
    password: {
        type: String,
        required: [true, "Password is mandatory to fill"]
    },
    token: {
        type: String,
        default: ""
    }
},
    {
        collection: "users",
        versionKey: false
    }
);

const userModel = mongoose.model("users", userSchema);
export default userModel;
