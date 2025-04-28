import mongoose, { Schema, Document, Types } from "mongoose";
import { User } from "./User";

export enum Intention {
  NONE = "none",
  GREETING = "greeting",
  GOODBYE = "goodbye",
  THANK_YOU = "thank_you",
  SORRY = "sorry",
  CONFESSION = "confession",
  COMPLIMENT = "compliment",
  ADVICE = "advice",
  QUESTION = "question",
  REQUEST = "request",
  OFFER = "offer",
  SUGGESTION = "suggestion",
  PROMISE = "promise",
  WARNING = "warning",
  CRUSH = "crush",
}

export interface IMessage extends Document {
  content: string;
  userId: Types.ObjectId;
  intention: Intention;
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
    intention: {
      type: String,
      enum: Object.values(Intention),
      default: Intention.NONE,
    },
  },
  { timestamps: true }
);

const MessageModel =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
