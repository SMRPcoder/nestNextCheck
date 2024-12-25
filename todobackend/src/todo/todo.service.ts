import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoSchemaDocument } from './entities/todo.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class TodoService {

  constructor(
    @InjectModel(Todo.name) private readonly todoModel:Model<TodoSchemaDocument>
  ){}

  async create(createTodoDto: CreateTodoDto) {
    try {
      await this.todoModel.create({...createTodoDto});
    return {message:"Added Successfully!",status:true};
    } catch (error) {
      console.log(error);
      return {message:"Internal Error Happend!",status:false};
    }
  }

  async findAll() {
    try {
      const data=await this.todoModel.find().sort({"createdAt":-1}).exec();
    return {data,status:true};
    } catch (error) {
      console.log(error);
      return {message:"Internal Error Happend!",status:false};
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  async update(id: Types.ObjectId, updateTodoDto: UpdateTodoDto) {
    try {
      const updateData=await this.todoModel.findById(id);
      if(updateData){
        await updateData.updateOne({...updateTodoDto});
        return {message:"Updated Successfully!",status:true};
      }else{
        return {message:"Invalid Id Given!",status:true};
      }
    } catch (error) {
      console.log(error);
      return {message:"Internal Error Happend!",status:false};
    }
  }

  async remove(id: Types.ObjectId) {
    return this.todoModel.deleteOne({_id:id}).then(()=>{
      return {message:"deleted successfully!",status:true};
    }).catch((err)=>{
      console.log(err);
      return {message:"Error Happend!",status:false};
    })
  }
}
