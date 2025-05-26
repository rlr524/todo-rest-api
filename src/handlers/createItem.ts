import zod from "zod";

const itemSchema = zod.object({
	title: zod.string(),
	description: zod.string().optional(),
	due: zod.string().optional(),
	complete: zod.boolean().default(false),
	owner: zod.string(),
	deleted: zod.boolean().default(false),
});

class CreateItemHandler {
	/**
	 *
	 */
	constructor() {}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async processEvent(event: any) {
		console.info("Event", event);
		const body = JSON.parse(event.body);

		itemSchema.parse(body)

		return {
			statusCode: 200,
			body: JSON.stringify({ message: "Create item" }),
		};
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handler(event: any) {
	try {
		const instance = new CreateItemHandler();
		return await instance.processEvent(event);
	} catch (error) {
		console.error(`createItem handler error: ${error}`);

		return {
			statusCode: 500,
			body: JSON.stringify({
				error: "there was an error creating an item",
			}),
		};
	}
}
