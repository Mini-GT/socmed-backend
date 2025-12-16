import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/users.model';
import { UsersService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { GetUserInput } from './dto/get-user.input';
import { CreateUserResponse } from './models/create-user-response.model';
import { GetUserResponse } from './models/get-user-reponse.model';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => CreateUserResponse)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User])
  users() {
    return this.usersService.findAll();
  }

  @Query(() => GetUserResponse)
  getUser(@Args('getUserInput') getUserInput: GetUserInput) {
    const user = this.usersService.findOneById(getUserInput);

    if (!user) {
      return { user: null, message: 'User not found' };
    }

    return { user, message: 'User found' };
  }
}
