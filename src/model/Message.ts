import mongoose, { Schema, Document } from "mongoose";
import { User } from "./User";

enum Intention {
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

export interface Message extends Document {
  content: string;
  userId: User["_id"];
  intention: Intention;
}

const MessageSchema: Schema<Message> = new Schema(
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
  mongoose.models.Message || mongoose.model<Message>("Message", MessageSchema);

export default MessageModel;
