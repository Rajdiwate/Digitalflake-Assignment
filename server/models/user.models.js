import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import AutoIncrement from "mongoose-sequence"


const autoIncrement = AutoIncrement(mongoose);

// Schema definition
const userSchema = new Schema(
    {
        userId: {
            type: Number
        },
        name: {
            type: String,
            required: [true, "Please Enter Your Name"],
            maxLength: [30, "Name cannot exceed 30 chars"],
            minLength: [2, "Name should have more than 2 characters"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Please Enter Your Email"],
            unique: true,
            validate: [validator.isEmail, "Please Enter a Valid Email"],
        },
        password: {
            type: String,
            // required: [true, "Enter Your Password"],
            minLength: [8, "Password should be greater than 8 characters"],
        },
        mobile: {
            type: Number,
        },
        status: {
            type: String,
            default: "Active"
        },
        avatar: {
            public_id: {
                type: String,
                required: function () {
                    return this.avatar && this.avatar.public_id;
                },
            },
            url: {
                type: String,
                required: function () {
                    return this.avatar && this.avatar.url;
                },
            },
        },
        role:
        {
            type: String,
            default : "Active"
        }
        ,
        refreshToken: {
            type: String,
        },
        resetPasswordToken: String,
        resetPasswordExpiry: Date,
    },
    { timestamps: true }
);

//Auto increment id 
userSchema.plugin(autoIncrement, { inc_field: 'userId' })

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    return resetToken;
};

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            role: this.role,
            name: this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

// Export the User model
export const User = mongoose.model("User", userSchema);
