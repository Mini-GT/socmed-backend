import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  async create(createAuthInput: CreateAuthInput) {
    const { email, password, name } = createAuthInput;

    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');

      // check email
      const emailCheck = `
        SELECT 1 FROM users WHERE email = $1
      `;
      const { rows } = await client.query(emailCheck, [email]);

      if (rows.length > 0) {
        throw new ConflictException('Email already exists');
      }

      // hash password
      const hashed = await bcrypt.hash(password, 10);

      // insert user and RETURN id
      const insertUserQuery = `
        INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING id
      `;

      const {
        rows: [{ id: userId }],
      } = await client.query(insertUserQuery, [email, hashed]);

      // insert profile with FK = PK
      const insertProfileQuery = `
        INSERT INTO users_profile (user_id, display_name)
        VALUES ($1, $2)
      `;

      await client.query(insertProfileQuery, [userId, name]);

      await client.query('COMMIT');

      return { message: 'User created successfully' };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
