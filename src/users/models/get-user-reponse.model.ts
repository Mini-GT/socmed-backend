import { ObjectType, Field, PartialType } from '@nestjs/graphql';
import { CreateUserResponse } from './create-user-response.model';
import { User } from './users.model';

@ObjectType()
export class GetUserResponse extends PartialType(CreateUserResponse) {
  @Field(() => User, { nullable: true })
  user?: User;
}
