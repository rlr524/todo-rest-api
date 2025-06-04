import ImageMetadata from "./imageMetadata.js";

export interface Item {
	id: string;
	title: string;
	images?: ImageMetadata[];
	description: string;
	due: Date;
	owner: string;
	completed: boolean;
	deleted: boolean;
	createdAt: Date;
}

export interface CreateOrUpdateItemBody {
	title: string;
	description: string;
	due: Date;
	owner: string;
	images?: Express.Multer.File[];
}
