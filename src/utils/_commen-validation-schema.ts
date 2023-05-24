import Joi from "joi";

const objectIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).required();

export const paramSchema = Joi.object({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        "string.pattern.base": "Invalid id provided"
    })
})