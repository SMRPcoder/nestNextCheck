import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TodoModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRoot(process.env.MONGO_URL,{
      dbName:"todotest",
      onConnectionCreate:(conn)=>{
        console.log("connection established successfully!")
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
