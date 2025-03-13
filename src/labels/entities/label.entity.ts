import {
  IsDate,
  IsHexColor,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class Label {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @IsDate()
  createdAt: Date;
}
