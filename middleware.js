import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt";

export async function middleware(req, res){

  const path = req.nextUrl.pathname
  // console.log(path)
  const token = await getToken({req})
  // console.log(token)
  switch(path){
    case '/dashboard/admin':
      
      if(!token || token?.role !== 1){
        return NextResponse.redirect(new URL('/', req.url))
      }
      break
    case '/dashboard/user':
      if(!token){
        console.log(token)
        return NextResponse.redirect(new URL('/', req.url))
      }
      break
    default: break
      
  }
  
}

// if(req.nextUrl.pathname.startsWith('/dashboard/admin')){
//   //แบบนี้คือการถามข้อมูลจาก client ซึ่งอาจมีการปลอมแปลงโทเคนได้
//   //อาจทำการไปถามจากฐานข้อมูลเพีื่อความปลอดภัย
//   const token = await getToken({req})
//   if(token?.role !== 1){
//     return NextResponse.redirect(new URL('/', req.url))
//   }
// }

// export const config = { 
//   matcher: [
//     "/admin"
//   ] }