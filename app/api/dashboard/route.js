import connectDB from "@/app/lib/db";
import User from "@/app/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
       const cookieStore = await cookies();
        const token = cookieStore.get("token");
       if (!token) {
            return NextResponse.json(
                { message: "Not authenticated" },
                { status: 401 }
            );
        }
        
        const decoded = jwt.verify(
            token.value,
            process.env.JWT_SECRET
        );
        await connectDB();

        const user = await User.findById(decoded.id).select(
            "-password"
        );
         if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({
            user
        });
         
      }catch (error) {
        console.error("ME API ERROR:", error);

        return NextResponse.json(
            { message: "Invalid token" },
            { status: 401 }
        );
    } 
}