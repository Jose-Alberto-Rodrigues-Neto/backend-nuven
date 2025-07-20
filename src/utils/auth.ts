import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express';

dotenv.config()

const secret = process.env.JWT_SECRET

type TokenPayload = {
    userId: string,
    iat: number;
    exp: number
}

interface RequestUser extends Request{
    user?:{
        id:string
    }
}

export function generateToken(payload: object): string {
    return jwt.sign(payload, secret, { expiresIn: '30m' });
}

export function verifyToken(token){
    return jwt.verify(token, secret)
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "É preciso do token de acesso!" });
    return;
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;
    const reqUser = req as RequestUser;
    reqUser.user = { id: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado!" });
  }
}