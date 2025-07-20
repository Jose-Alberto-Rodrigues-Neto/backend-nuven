import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express';

dotenv.config()

const secret = process.env.JWT_SECRET

export type TokenPayload = {
    userId: string,
    iat: number;
    exp: number
}

export interface RequestUser extends Request{
    user?:{
        id:string
    }
}

export function generateToken(payload: { userId: string }): string {
  return jwt.sign(payload, secret, { expiresIn: '5m' });
}

export function verifyToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, secret);

  if (typeof decoded === 'string' || !('userId' in decoded)) {
    throw new Error('Token malformado ou inválido!');
  }

  return decoded as TokenPayload;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "É preciso do token de acesso!" });
    return
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.status(401).json({ error: "Formato de token inválido! Esperado: Bearer <token>" });
    return 
  }

  const token = parts[1];

  try {
    const decoded = verifyToken(token); // retorna TokenPayload
    const reqUser = req as RequestUser;
    reqUser.user = { id: decoded.userId }; // Aqui está o id do usuário real
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    res.status(401).json({ error: "Token inválido ou expirado!" });
  }
}
