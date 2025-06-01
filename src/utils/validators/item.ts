import Joi from "joi";
import { CreateOrUpdateItemBody } from "../../interfaces/item";

const createOrUpdateValidateItem = (body: CreateOrUpdateItemBody) => {
	const schema = Joi.object({
		title: Joi.string().required(),
		description: Joi.string().optional(),
		due: Joi.date().optional(),
		owner: Joi.string().required(),
	}).strict();

	return schema.validate(body, { abortEarly: false });
};

export default createOrUpdateValidateItem;
