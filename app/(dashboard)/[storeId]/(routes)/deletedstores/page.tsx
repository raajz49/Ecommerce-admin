import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
import SoftDeleted from "@/components/is-deleted"


const Navbar = async() => {

  const {userId} = auth();

  if(!userId){
    redirect('/sign-in');
  }

  const stores=await prismadb.store.findMany({
    where:{
      userId,
      isDeleted:true,
    },
  })
  return (
    <div className=" border-b-2">
   <div className=" flex h-16 items-center px-4">
    <SoftDeleted
    items={stores}  />
 
   </div>
    </div>
  )
}

export default Navbar
