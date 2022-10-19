import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export const jwtConstants = {
  secret: 'secretKey',
};

export class AuthToken {
  @ApiProperty({
    description: 'user auth token',
    type: String,
  })
  @IsNotEmpty()
  access_token: string;
}

export class AuthPayload {
  @ApiProperty({
    description: 'User id',
    type: String,
  })
  @IsNotEmpty()
  sub: string;
}
