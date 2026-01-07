import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

@InputType()
export class CreateAuthInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(20, { message: 'Name must not be more than 20 characters long' })
  @Matches(/^\S+$/, { message: 'Input must not contain spaces' })
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Invalid email' })
  @Matches(/^\S+$/, { message: 'Input must not contain spaces' })
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^\S+$/, { message: 'Input must not contain spaces' })
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Matches(/^\S+$/, { message: 'Input must not contain spaces' })
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
