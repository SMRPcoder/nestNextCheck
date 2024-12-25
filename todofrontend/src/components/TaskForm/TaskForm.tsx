"use client";

import React from 'react'
import { useForm } from "react-hook-form";
import styles from "./taskform.module.css";
import Button from '../Button/button';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddTodoSchema, AddTodoSchemaType } from '@/yup/addTodo';
import axios from 'axios';
import { BackendUrl } from '@/constants';
import { Notify } from 'notiflix';
import { useRouter } from 'next/navigation';

function TaskForm() {

    const {
        register,
        reset,
        formState: {
            isLoading,
            isSubmitting,
            errors
        },
        handleSubmit
    } = useForm<AddTodoSchemaType>({
        resolver:yupResolver(AddTodoSchema)
    });

    const router=useRouter();

    const handleTodoAdd=async (values:AddTodoSchemaType)=>{
        const AddTodoResponse=await axios.post(`${BackendUrl}todo`,{...values});
        if(AddTodoResponse.data.status){
            reset();
            Notify.success(AddTodoResponse.data.message);
            router.refresh();
        }else{
            Notify.failure(AddTodoResponse.data.message||"Error!");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleTodoAdd)} className='flex' >
                <div className="relative m-5">
                    <input {...register("task")} placeholder="Enter task" className={styles["input-field"]} type="text" />
                    <label htmlFor={styles["input-field"]} className={styles["input-label"]}>Enter task</label>
                    <span className={styles["input-highlight"]} />
                </div>
                <span>{errors.task?errors.task.message:""}</span>
                <div>
                    <Button type='submit' />
                </div>
            </form>
        </div>
    )
}

export default TaskForm