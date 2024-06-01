import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    if (isNaN(Number(req.params.id))) {
      throw new BadRequestException('ID inválido!');
    }

    if (Number(req.params.id) <= 0) {
      throw new BadRequestException('ID inválido!');
    }

    next();
  }
}
