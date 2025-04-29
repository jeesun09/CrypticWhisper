import mongoose, { Schema, Document, Types } from "mongoose";
import { User } from "./User";

export enum Feelings {
  NONE = "none",
  SORRY = "sorry",
  QUESTION = "question",
  REQUEST = "request",
  CRUSH = "crush",
  WARNING = "warning",
  CONFESSION = "confession",
}

export interface IMessage extends Document {
  content: string;
  userId: Types.ObjectId;
  feeling: Feelings;
}

const MessageSchema: Schema<IMessage> = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    feeling: {
      type: String,
      enum: Object.values(Feelings),
      default: Feelings.NONE,
    },
  },
  { timestamps: true }
);

const MessageModel =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
