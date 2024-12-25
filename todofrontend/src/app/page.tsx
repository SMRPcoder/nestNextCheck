"use server";
import { TodoResponse } from "@/appTypes";
import TableList from "@/components/ListData/TableList";
import TaskForm from "@/components/TaskForm/TaskForm";
import { BackendUrl } from "@/constants";
import axios, { AxiosResponse } from "axios";

export default async function Home() {
  const allTasksResponse:AxiosResponse<TodoResponse>=await axios.get(`${BackendUrl}todo`);
  const allTasks=allTasksResponse.data.data;
  return (
    <div className="items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <TaskForm/>
      <TableList data={allTasks} />
    </div>
  );
}
