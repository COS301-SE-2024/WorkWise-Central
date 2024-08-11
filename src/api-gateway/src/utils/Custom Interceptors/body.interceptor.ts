import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const jsonData = request.body.body;
    console.log('request', request);

    const parsedData = JSON.parse(jsonData);
    parsedData.profilePicture = request.file;

    console.log(parsedData);

    request.body = parsedData;
    return next.handle();
  }
}
