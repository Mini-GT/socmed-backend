import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateUserInput } from './dto/create-user.input';
import bcrypt from 'bcrypt';
import { GetUserInput } from './dto/get-user.input';

@Injectable()
export class UsersService {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  async create(createUserInput: CreateUserInput) {
    const { username, email, password, birthdate } = createUserInput;

    const emailQuery = `
      SELECT email 
      FROM users
      WHERE email = $1 
    `;

    // check if email already exist
    const { rows } = await this.pool.query(emailQuery, [email]);

    if (rows.length > 0) {
      return { message: 'Email already exist' };
    }

    const hashed = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, email, password, birthdate)
      VALUES ($1, $2, $3, $4)
    `;

    await this.pool.query(query, [username, email, hashed, birthdate]);

    return { message: 'User created successfully' };
  }

  async findAll() {
    const query = `
      SELECT id, username, email, birthdate, created_at as "createdAt"
      FROM users
      `;

    const { rows } = await this.pool.query(query);
    return rows;
  }

  async findOneById(getUserInput: GetUserInput) {
    const { id } = getUserInput;

    const query = `
      SELECT id, username, email, birthdate, created_at as "createdAt"
      FROM users
      WHERE id = $1
      `;

    const { rows } = await this.pool.query(query, [id]);

    if (!rows[0]) throw new NotFoundException('User not found');

    return rows[0];
  }
}
