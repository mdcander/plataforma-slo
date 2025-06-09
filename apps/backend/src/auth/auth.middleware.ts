import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Usuario } from '@slo/core';
import * as jwt from 'jsonwebtoken'
import { UsuarioPrisma } from './usuario.prisma';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor( private readonly repo: UsuarioPrisma ) {}

  async use(req: any, res: any, next: () => void) {
    try{
      const token = req.headers.authorization?.replace('Bearer ', '');

      if(!token) {
        throw new HttpException('Token não informado', 401)
      }
      
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as Usuario
      
      if(!payload){
        throw new HttpException('Token inválido', 401)
      }
  
      const usuario = await this.repo.buscarPorEmail(payload.email);
      delete usuario?.senha;

      if(!usuario){
        throw new HttpException('Usuario não encontrado', 401)
      }
      req.usuario = usuario;
      next();

    } catch( error) {
      throw new HttpException(`Token error: ${error}`, 401)
    }

  }
}
