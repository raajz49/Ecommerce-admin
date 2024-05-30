import prismadb from "@/lib/prismadb"


interface DashboardProps{
    params:{
        storeId:string
    }
}

const DashboardPage:React.FC<DashboardProps> =async ({params}) => {
    const store=await prismadb.store.findFirst({
        where:{
            isDeleted:false,
            id:params.storeId,
        }
    })

  return (
    <div>
      Active store: {store ? store.name : <span>Select a Store</span>}
    </div>
  )
}

export default DashboardPage
