import { Injectable, NestMiddleware } from '@nestjs/common';

// Este middleware se registra en el common.module
@Injectable()
export class LogginMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Request-reponse time');
    res.on('finish', () => console.timeEnd('Request-reponse time'));
    next();
  }
}
