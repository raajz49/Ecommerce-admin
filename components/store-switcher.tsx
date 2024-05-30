"use client"

import { useState } from "react";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";


import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover";
import useStoreModal from "@/hooks/use-store-modal";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";


type PopoverTriggerProps=React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps{
        items:Store[];
};

export default function StoreSwitcher({
    className,
    items=[]
}:StoreSwitcherProps){
  const storeModal=useStoreModal();
  const params=useParams();
  const router=useRouter();
  
  
  //this maps the list of all the items
  const formattedItems = items
  .filter((item) => !item.isDeleted)
  .map((item) => ({
      label: item.name,
      value: item.id,
  }));
  //for currentstore information fetched from formattedItems
  const currentStore=formattedItems.find((item)=>item.value===params.storeId);
  
        const [open,setOpen]=useState(false);
        const onStoreSelect=(store:{value:string,label:string})=>{
            setOpen(false);
            router.push(`/${store.value}`)
        }
    return(
            
        //the search bar starts from here
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
                    {currentStore ? currentStore.label : "Select a Store"}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                                </Button> 
                                
            </PopoverTrigger>
            

                {/* The popover starts from here after the click on button */}
                {/* this is the box */}
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    {/* //This is the first box inside the popover */}
                    <CommandList>
                        <CommandInput 
                        placeholder="Search Store..."/>
                        <CommandEmpty >No store found</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store)=>(
                                <CommandItem
                                key={store.value}
                                onSelect={()=>onStoreSelect(store)}
                                className="text-sm"
                                >
                                <StoreIcon className="mr-2 h-4 w-4" />
                                {store.label}
                                <Check 
                                className={cn(
                                    "ml-auto h-4 w-4",
                                    currentStore?.value===store.value?"opacity-100":"opacity-0"
                                    )}/>
                                </CommandItem>
                            ))}
                            </CommandGroup> 
                    </CommandList>
                        {/* THE INNER PART */}
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                            onSelect={()=>{
                                setOpen(false)
                                storeModal.onOpen()
                            }}
                            >
                            <PlusCircle  
                            className="mr-2 h-5 w-5"/>
                            Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                    </Command> 
            </PopoverContent>
        </Popover>
    );
};