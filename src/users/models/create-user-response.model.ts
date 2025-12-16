import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateUserResponse {
  @Field()
  message: string;
}
