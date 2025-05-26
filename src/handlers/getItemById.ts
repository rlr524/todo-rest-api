// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handler(event: any) {
	console.info("Event", event);

	return {
		statusCode: 200,
		body: JSON.stringify({ message: "Get item by ID" }),
	};
}
