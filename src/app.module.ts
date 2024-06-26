import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module'
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ahsan:password-123@cluster0.h3mh35m.mongodb.net/?retryWrites=true&w=majority'),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
