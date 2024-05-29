import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
      
        const {userId} =  auth();
        // console.log(userId, "iddd")
        const body= await req.json();
        const {name}=body;
        if(!userId){
           return new NextResponse("Unauthorized",{status:401});
        }

        if(!name){
            return new NextResponse("Name is required",{status:400});
        }
        
        const store = await prismadb.store.create({
            data:{
                name,
                userId,
              }  
    });
        return NextResponse.json(store)
    
    } catch (error) {
        console.log('[STORES_POST]',error);
        return new NextResponse("Internal Error",{status:500});
    }
}

export async function GET(req: Request) {
    try {
      const { userId } = auth(); // Destructure userId from the auth response
  
      if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
  
      const finduser = await prismadb.store.findFirst({
        where: {
          userId: userId,
        },
      });
  
      return NextResponse.json(finduser);
    } catch (error) {
      console.error('[STORE_GET]', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }
  
  

//THIS IS FOR SOFTDELETE
  export async function GETDELETEDSTORE(req: Request) {
    try {
      const { userId } = auth(); // Destructure userId from the auth response
  
      if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
  
      const finduser = await prismadb.store.findFirst({
        where: {
          userId: userId,
          isDeleted:true,
        },
      });
  
      return NextResponse.json(finduser);
    } catch (error) {
      console.error('[STORE_GET]', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }
  
  


