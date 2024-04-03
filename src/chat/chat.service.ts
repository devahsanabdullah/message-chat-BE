// src/chat/chat.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import {UpdateMessageDto} from './dto/update-message.dto'
@Injectable()
export class ChatService {
  constructor(@InjectModel(Message.name) private readonly messageModel: Model<Message>) {}

//   create messages
  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const newMessage = new this.messageModel(createMessageDto);
    return newMessage.save();
  }


//  find user and vednor messages
  async findMessagesByUserAndVendor(userId: string, vendorId: string): Promise<Message[]> {
    const messages = await this.messageModel.find().exec();
    return messages.filter(message => message.userId === userId && message.vendorId === vendorId);
  }
  
// update message
  async updateMessage(id: string, updateMessageDto: UpdateMessageDto): Promise<Message> {
    const updatedMessage = await this.messageModel.findByIdAndUpdate(id, updateMessageDto, { new: true }).exec();
    if (!updatedMessage) {
      throw new NotFoundException(`Message with ID "${id}" not found`);
    }
    return updatedMessage;
  }


//   delete message 
  async deleteMessage(id: string): Promise<any> {
    const result = await this.messageModel.findOneAndDelete({ _id: id }).exec();
    if (!result) {
      throw new NotFoundException(`Message with ID "${id}" not found`);
    }
    return result;
  }
  
}
