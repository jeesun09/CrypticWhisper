import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/db/dbConnect";
import UserModel, { Message } from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

const decryptContent = (encryptedContent: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      encryptedContent,
      process.env.ENCRYPTION_KEY!
    );
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
};

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }
  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    const decryptedMessages = user[0].messages.map(
      (msg: any): Message => ({
        ...msg,
        content: decryptContent(msg.content),
      })
    );

    if (!user || user.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No messages found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        messages: decryptedMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting messages:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get messages",
      },
      { status: 500 }
    );
  }
}
