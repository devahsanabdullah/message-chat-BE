// src/chat/schemas/message.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  vendorId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
