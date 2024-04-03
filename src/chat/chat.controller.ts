// src/chat/chat.controller.ts
import { Controller, Get, Post,Put,Delete,Param, Body,Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import {UpdateMessageDto} from './dto/update-message.dto'
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.chatService.create(createMessageDto);
  }

  @Get()
  async getMessages(
    @Query('userId') userId: string,
    @Query('vendorId') vendorId: string,
  ) {
    return this.chatService.findMessagesByUserAndVendor(userId, vendorId);
  }


  @Put(':id')
  async updateMessage(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.chatService.updateMessage(id, updateMessageDto);
  }



  @Delete(':id')
  async deleteMessage(@Param('id') id: string) {
    return this.chatService.deleteMessage(id);
  }
}
