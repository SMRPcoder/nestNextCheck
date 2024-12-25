import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({timestamps:true})
export class Todo{
    @Prop()
    task:string;

    @Prop({enum:["DONE","PENDING"],default:"PENDING"})
    status:"DONE"|"PENDING";
}

export const TodoSchema=SchemaFactory.createForClass(Todo);

export type TodoSchemaDocument=HydratedDocument<Todo>;