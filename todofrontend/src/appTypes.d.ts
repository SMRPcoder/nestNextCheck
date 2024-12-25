export interface TodoResponse{
    data:{
        _id:string;
        task: string;
        status: "PENDING"|"DONE";
        createdAt:string;
        updatedAt:string;
      }[];
    status: boolean;
  }