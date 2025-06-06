import ItemService from "../../src/services/item";
import ImageMetadata from "../../src/interfaces/imageMetadata";
import { v4 as uuidv4 } from "uuid";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
//import { Item } from "../../src/interfaces/item";

describe("ItemService", () => {
	describe("createItem", () => {
		it("should create a new item", async () => {
			// arrange
			const title = "Test Item";
			const description = "A test item for item unit test";
			const due = new Date(2025, 5, 6, 12, 0, 0, 0);
			const owner = "rob@emiyaconsulting.com";
			const image: ImageMetadata = {
				id: uuidv4(),
				filename: "madison.jpg",
				key: "test/madison.jpg",
				url: "https://us-west-2.console.aws.amazon.com/s3/object/emiya-todo-api-test-bucket?region=us-west-2&bucketType=general&prefix=madison.jpg",
			};
			const images: ImageMetadata[] = [image];
			// mock the DynamoDB document client
			const putMock = jest
				.fn()
				.mockReturnValueOnce({ promise: jest.fn() });
			jest.spyOn(DocumentClient.prototype, "put").mockImplementation(
				putMock
			);

			// act
			const result = await ItemService.createItem(
				title,
				description,
				due,
				owner,
				images
			);

			// assert
			expect(result).toBeDefined();
			expect(result.id).toBeDefined();
			expect(result.title).toEqual(title);
			expect(result.description).toEqual(description);
			expect(result.due).toEqual(due);
			expect(result.owner).toEqual(owner);
			expect(result.images).toEqual(images);
			expect(result.createdAt).toBeDefined();

			// verify that the DynamoDB document client was called
			// with the correct arguments
			expect(putMock).toHaveBeenCalledWith({
				TableName: process.env.ITEM_TABLE!,
				Item: result,
			});
		});
	});
});
