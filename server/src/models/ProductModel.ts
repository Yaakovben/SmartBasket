import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
  listId: Types.ObjectId;
  name: string;
  quantity: number;
  bought: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  listId: { type: Schema.Types.ObjectId, ref: "List", required: true },
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  bought: { type: Boolean, default: false },
  imageUrl: { type: String }
}, { timestamps: true });

ProductSchema.index({ listId: 1 });

export const Product = model<IProduct>("Product", ProductSchema);
