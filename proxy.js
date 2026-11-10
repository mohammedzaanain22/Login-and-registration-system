    import jwt from "jsonwebtoken";
    import { NextResponse } from "next/server";



    export  function proxy(request) {   
        const token = request.cookies.get("token");

        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        try {
            jwt.verify(token.value, process.env.JWT_SECRET);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

    }
     export const config = {
            matcher: [
        "/dashboard/:path*",
      
        
    ],
        };
