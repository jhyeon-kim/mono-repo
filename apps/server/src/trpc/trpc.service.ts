import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';

@Injectable()
export class TrpcService {
  trpc = initTRPC.meta<OpenApiMeta>().create();
  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
}
