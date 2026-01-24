import { InputType, PartialType } from '@nestjs/graphql';
import { GetUserInput } from './get-user.input';

@InputType()
export class UpdateUserInput extends PartialType(GetUserInput) {}
