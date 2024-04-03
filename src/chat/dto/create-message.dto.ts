// src/chat/dto/create-message.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  readonly senderId: string;

  @IsNotEmpty()
  @IsString()
  readonly vendorId: string;

  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly message: string;
}
