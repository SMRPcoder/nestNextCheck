import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    task:string;

    @IsEnum(["DONE","PENDING"])
    @IsString()
    @IsOptional()
    status:"DONE"|"PENDING";
}
