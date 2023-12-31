import {
    CallHandler,
    Injectable,
    NestInterceptor,
    ExecutionContext,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                map((data) => ({
                        status: "success",
                        data: data
                    })
                ),
                catchError((err) => of({
                    status: 'fail',
                    data: err
                }))
            );
    }

}