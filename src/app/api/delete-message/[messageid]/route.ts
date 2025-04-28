import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import MessageModel from "@/model/Message";
import { User } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const deletedMessage = await MessageModel.findByIdAndDelete({
      _id: messageId,
      userId: user._id,
    });

    if (!deletedMessage) {
      return NextResponse.json(
        {
          success: false,
          message: "Message not found or already deleted",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete message",
      },
      { status: 500 }
    );
  }
}
