import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateAuthResponse {
  @Field()
  message: string;
}
