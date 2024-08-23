import UserModel from "@/model/User";
import dbConnect from "@/lib/db/dbConnect";
import { Message } from "@/model/User";
import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    //check if user is accepting messages
    if (!user.isAcceptingMessages) {
      return NextResponse.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        { status: 403 }
      );
    }
    const encryptedContent = CryptoJS.AES.encrypt(
      content,
      process.env.ENCRYPTION_KEY!
    ).toString();
    const newMessage = { content: encryptedContent, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending message:", error);    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message",
      },
      { status: 500 }
    );
  }
}
