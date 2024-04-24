import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const now = Date.now();

    console.log('Route:', request.url);
    //console.log('Params:', request.params);
    //console.log('Query:', request.query);
    console.log('Body:', request.body);

    return next.handle().pipe(
      tap((/*response*/) => {
        const httpServer = httpContext.getResponse();
        console.log('Response status:', httpServer.statusCode);
        //console.log('Response:', JSON.stringify(response));
        console.log('Response time:', Date.now() - now, 'ms');
      }),
    );
  }
}
