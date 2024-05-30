"use client"

import { useState } from "react";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";


import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";
import { ChevronsUpDown, RotateCw, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem, CommandList,  } from "@/components/ui/command";
import axios from "axios";
import toast from "react-hot-toast";
import { AlertModal } from "./modals/alert.modal";


type PopoverTriggerProps=React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface IsDeletedProps extends PopoverTriggerProps{
        items:Store[];
};

export default function SoftDeleted({
    className,
    items=[]
}:IsDeletedProps){
//   const storeModal=useStoreModal();
  const params=useParams();
  const router=useRouter();
  
  
  //this maps the list of all the items
  const formattedItems=items.map((item)=>({
    label:item.name,
    value:item.id
  }));
  
  //for currentstore information fetched from formattedItems
  const currentStore=formattedItems.find((item)=>item.value===params.storeId);

        const [open,setOpen]=useState(false);
        const [retrive,setRetrive]=useState(false);
        const [loading,setLoading]=useState(false);
        const onStoreSelect=(store:{value:string,label:string})=>{
            setOpen(false);
            router.push(`/${store.value}`)
        }

        const onDelete = async () => {
            try {
                setLoading(true);
                await axios.delete(`/api/stores/${params.storeId}`);
                router.refresh();
                router.push("/")
                toast.success("Store Retrived");
                
            } catch (error) {
                toast.error("Can't retrive this store");
            } finally {
                setLoading(false);
                setRetrive(false);
            }
        };

    return(
            <>
              <AlertModal 
                isOpen={retrive}
                onClose={() => setRetrive(false)}
                onConfirm={onDelete}
                loading={loading}
            />
        {/* the search bar starts from here */}
        <Popover open={open} onOpenChange={setOpen}>
            
            {/* This makes the button trigger on click */}
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                size="sm"
                role="combobox"
                aria-expanded={open}
                aria-label="Select a store"
                className={cn("w-[200px] justify-between",className)}
                >

                    <StoreIcon className="mr-2 h-4 w-4" />
                   {/* {currentStore?.label} */}
                   Deleted Store
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button> 
            </PopoverTrigger>

                {/* The popover starts from here after the click on button */}
                {/* this is the box */}
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    {/* //This is the first box inside the popover */}
                    <CommandList>
                        {/* <CommandInput 
                        placeholder="Search Store..."/>
                        <CommandEmpty >No store found</CommandEmpty> */}
                        <CommandGroup heading="Deleted Stores">
                            {formattedItems.map((store)=>(
                                <CommandItem
                                key={store.value}
                                // onSelect={()=>onStoreSelect(store)}
                                className="text-sm"
                                >
                                {/* <Check className="mr-2 h-4 w-4" /> */}
                                {store.label}
                                
                         <Button
                         disabled={loading}
                         variant="secondary"
                         size="sm"
                         onClick={() => setRetrive(false)}
                         className={cn(
                         "ml-auto h-4 w-4opacity-100"
                         )}
                         >
                        <RotateCw className="h-4 w-4"  />
                       </Button>
             
             
                                </CommandItem>
                            ))}
                            </CommandGroup> 
                    </CommandList>
                        {/* THE INNER PART */}
                  
                    </Command> 
            </PopoverContent>
        </Popover>
        </>
    );
};