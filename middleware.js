import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt";

export async function middleware(req, res){
  if(req.nextUrl.pathname.startsWith('/admin')){
    const token = await getToken({req})
    if(token?.role !== 1){
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
}

// export const config = { 
//   matcher: [
//     "/admin"
//   ] }