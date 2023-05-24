import Joi from "joi";

const signupSchema = Joi.object({

    name: Joi.string()
        .min(3)
        .max(10)
        .required()
        .messages({
            "string.min": "username must be at least 3 characters",
            "any.required": "name is required"
        }),

    password: Joi.string()
        .required(),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "invalid email format"
        })
})


const loginSchema = Joi.object({
    password: Joi.string()
        .required()
        .messages({
            "any.required": "Password is required"
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "any.required": "Email is required"
        })
})




export {
    signupSchema,
    loginSchema,
}