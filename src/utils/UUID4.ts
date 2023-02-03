import { IsUUID } from 'class-validator';

export class UUID4 {
  @IsUUID(4)
  id!: string;
}
