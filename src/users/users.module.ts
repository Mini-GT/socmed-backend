import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
