import { Injectable, NestMiddleware, UseGuards } from '@nestjs/common';
import { log } from 'console';
import { Response, NextFunction } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';

@Injectable()
@UseGuards(JwtAuthGuard)
export class AdminMiddleware implements NestMiddleware {
  use(req: { user: User }, res: Response, next: NextFunction) {
    const user: User = req.user;
    console.log(user);

    if (user || user.admin) {
      next();
    } else {
      res.status(401).json({ message: 'Accès refusé' });
    }
  }
}
