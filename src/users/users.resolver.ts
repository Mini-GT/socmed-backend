import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/users.model';
import { UsersService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UserResponse } from './models/user-response.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserResponse)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User])
  users() {
    return this.usersService.findAll();
  }

  @Query(() => User, { nullable: true })
  user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOneById(id);
  }
}
