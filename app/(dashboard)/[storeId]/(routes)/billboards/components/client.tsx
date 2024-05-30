"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"


import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { BillboardColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"



interface BillboardsClientProps{
    data:BillboardColumn[]
}

export const BillboardsClient:React.FC<BillboardsClientProps>=({
    data
})=>{
    const router=useRouter()
    const params=useParams()
    return(
        <>
        <div className="flex items-center justify-between">
           <Heading
           title={`Billboard(${data.length})`}
           description="Manage Billboards for your store" />
           <Button onClick={()=>router.push(`/${params.storeId}/billboards/new`)}>
            <Plus className="mr-2 h-4 w-4"/>
            Add new
           </Button>
        </div>
        <Separator />
        <DataTable 
        searchkey="label" 
        columns={columns}
        data={data}
        />
        <Heading 
        title="API"
        description="API calls for billboards"/>
        <Separator/>
        <ApiList
        entityName="billboards"
        entityIdName="billboardId"
        /> 
        </>
    )
}