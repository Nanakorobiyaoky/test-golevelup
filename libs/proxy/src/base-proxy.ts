import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  catchError,
  defaultIfEmpty,
  firstValueFrom,
  throwError,
  timeout,
} from 'rxjs';
import { GatewayTimeoutException } from '@nestjs/common';

export abstract class BaseProxy {
  protected readonly client: ClientProxy;

  protected async sendMessage(
    pattern: {cmd: string},
    data: any,
  ): Promise<any>;

  protected async sendMessage(
    pattern: {cmd: string},
    payload: any,
  ): Promise<any> {
    const result = this.client.send(pattern, payload).pipe(
      timeout({
        each: 5000,
        with: () => throwError(() => new RpcException(new GatewayTimeoutException())),
      }),
      catchError((error) => {
        return throwError(() => new RpcException(error.response));
      }),
      defaultIfEmpty(null),
    );

    return firstValueFrom(result);
  }
}
