import { Injectable } from '@nestjs/common';
import { ProvedorCripto } from '@slo/core'
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptProvider implements ProvedorCripto {

    async criptografar(senha: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(senha, salt);
    }
    
    async comparar(senha: string, senhaCripto: string): Promise<boolean> {
        return bcrypt.compare(senha, senhaCripto);
    }
    
}
