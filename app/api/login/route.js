import User from "@/app/models/User";
import connectDB from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


export async function POST(req) {

    try {
        const { email, password } = await req.json();
        if(!email || !password) {
            return NextResponse.json(
                { message: "All fields are required" }, 
                { status: 400 }
            );
        }
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
    return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
    );
}
         const isPasswordCorrect = await bcrypt.compare(password, user.password);


        if( !isPasswordCorrect) {
            return NextResponse.json(
                { message: "Invalid email or password" }, 
                { status: 401 }
            );
        }
        const token = jwt.sign(
            {id : user._id} , 
            process.env.JWT_SECRET , 
            {expiresIn : "7d"} ,
           ) 

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/"
        });

      return NextResponse.json(
    {
        message: "Login successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    },
    { status: 200 }
);
    }catch (error) {
        console.error("Error during login:", error);

    return NextResponse.json(  
        {message: "Internal Server Error" },
        { status: 500 }
    );
}
     
}