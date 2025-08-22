import { Schema, model, Document, Types } from "mongoose";

interface IList extends Document {
  listName: string;
  userIds: Types.ObjectId[]; // רק IDs של המשתמשים
  createdAt: Date;
  updatedAt: Date;
}

const ListSchema = new Schema<IList>({
  listName: { type: String, required: true },
  userIds: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
}, { timestamps: true });

// אינדקס על userIds → שאילתות מהירות לפי משתמש
ListSchema.index({ userIds: 1 });

export const List = model<IList>("List", ListSchema);
