import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto';
import { Auth } from './entities';
import { Payload, JwtPayloadResponse } from './interface';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(createAuthDto: CreateAuthDto) {
    try {
      let user: Auth = null;
      const { accountId, ...rest } = createAuthDto;
      const findAccount = await this.findByAccountId(accountId);

      if (findAccount) {
        user = await this.authRepository.save({ ...findAccount, ...rest });
      } else {
        user = await this.authRepository.save({ account: accountId, ...rest });
      }
      const payload = this.createJwtPayload(user);
      const access_token = await this.jwtService.signAsync(payload);
      const jwtExp = this.jwtService.decode(access_token);

      const resp: JwtPayloadResponse = {
        access_token,
        expires_in: jwtExp.exp,
        token_type: 'Bearer',
        scope: 'write read',
      };

      return resp;
    } catch (error) {
      this.commonService.handleError(error);
    }
  }

  async findByAccountId(account: string) {
    try {
      const result = await this.authRepository.findOne({ where: { account } });
      if (!result) null;
      return result;
    } catch (error) {
      this.commonService.handleError(error);
    }
  }

  async findById(id: string) {
    const account = await this.authRepository.findOne({ where: { id } });
    if (!account) return null;
    return account;
  }

  private createJwtPayload({ id, email, username }: Auth) {
    const payload: Payload = {
      sub: id,
      iss: this.configService.get<string>('APP_HOST'),
      iat: Math.floor(Date.now() / 1000),
      email,
      username,
    };
    return payload;
  }
}
