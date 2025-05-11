import { Schema, model } from "mongoose";

interface IItem {
    title: string;
    description: string;
    due: string;
    complete: boolean;
    owner: string;
}

const itemSchema = new Schema<IItem>({
    title: { type: String, required: true },
    description: { type: String, required: false },
    due: { type: String, required: false },
    complete: { type: Boolean, required: false },
    owner: { type: String, required: true }
})

export const Item = model<IItem>("Item", itemSchema);