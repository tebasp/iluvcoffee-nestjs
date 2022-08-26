import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    // Tap: calls anonymous login
    // next.handle().pipe(tap((data) => console.log(data)));

    // Map: Crea un wrapper en la response
    return next.handle().pipe(map((data) => ({ data })));
  }
}
