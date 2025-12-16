import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { GetUserInput } from './get-user.input';

@InputType()
export class UpdateUserInput extends PartialType(GetUserInput) {}
