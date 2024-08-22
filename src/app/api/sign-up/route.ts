import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    // Check if user already exists
    const existingUser = await UserModel.findOne({
      $or: [{username}, {email}],
    })
    if(existingUser && existingUser.isVerified){
      const conflictField =
        existingUser.username === username ? "Username" : "Email";
      return NextResponse.json(
        {
          success: false,
          message: `${conflictField} already exists`,
        },
        { status: 400 }
      );
    }

    const[hashedPassword, verifyCode ] = await Promise.all([
      bcrypt.hash(password, 10),
      (Math.floor(100000 + Math.random() * 900000)).toString(),
    ])

    if(existingUser) {
      existingUser.password = hashedPassword;
      existingUser.verifyCode = verifyCode;
      existingUser.verifyCodeExpiry = new Date(Date.now() + 3600000);
      await existingUser.save();
    } else {
      const expiryDate = new Date(Date.now() + 3600000);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: []
      });
      await newUser.save();
    }
    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    // Check if email was sent successfully
    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error registering user", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
