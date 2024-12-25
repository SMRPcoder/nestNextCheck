"use client"
import { BackendUrl } from '@/constants';
import axios from 'axios';
import { Notify } from 'notiflix';
import React from 'react';
import { RiRadioButtonLine } from "react-icons/ri";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useRouter } from 'next/navigation';

interface TableListProp {
    _id: string;
    task: string;
    status: "PENDING" | "DONE";
    createdAt: string;
    updatedAt: string;
}
export default function TableList({ data }: { data: TableListProp[] }) {

    const router=useRouter();

    const handleDelete=(id:string)=>async ()=>{
        const deletedRespons=await axios.delete(`${BackendUrl}todo/${id}`);
        const responseData=deletedRespons.data;
        if(responseData.status){
            Notify.success(responseData.message);
            router.refresh();
        }else{
            Notify.failure(responseData.message||"Error!!");
        }
    }
    return (
        <div>
            <ul className=" divide-y w-[100%] divide-gray-200 dark:divide-gray-700">
                {data.map((listData, index) => (
                    <li key={index} className="pb-3 sm:pb-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex-shrink-0">
                                <RiRadioButtonLine color={listData.status == "PENDING" ? 'yellow' : "green"} size={40} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {listData.task}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {listData.status=="PENDING"?"Pending":"Done"}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                <button onClick={handleDelete(listData._id)} className='hover:cursor-pointer' >
                                <RiDeleteBin2Fill color='red' />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    )
}
