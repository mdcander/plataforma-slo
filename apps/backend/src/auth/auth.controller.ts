import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioPrisma } from './usuario.prisma';
import { LoginUsuario, RegistrarUsuario, Usuario } from '@slo/core';
import { BcryptProvider } from './bcrypt.provider';
import * as jwt from 'jsonwebtoken'


@Controller('auth')
export class AuthController {

    constructor( 
        private readonly repo: UsuarioPrisma,
        private readonly cripto: BcryptProvider
    ){}

    @Post('login')
    async login( @Body() dados: { email: string, senha: string } ) {
        const casoDeUso = new LoginUsuario( this.repo, this.cripto );
        const usuario = await casoDeUso.executar({ email: dados.email , senha: dados.senha});
        
        const segredo = process.env.JWT_SECRET;
        return jwt.sign(usuario, segredo as any, { 
                expiresIn: '15d',
             });
    }

    @Post('registrar')
    async registrar(@Body() usuario: Usuario) {
        console.log('Registrando')
        const casoDeUso = new RegistrarUsuario( this.repo, this.cripto );
        return await casoDeUso.executar(usuario);
    }
    
}
