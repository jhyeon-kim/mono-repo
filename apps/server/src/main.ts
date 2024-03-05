import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from '@server/trpc/trpc.router';
import { setupSwaggerWithTrpc } from '@server/utils/trpcSwaggerIntegration';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);
  setupSwaggerWithTrpc(app, trpc.appRouter);

  await app.listen(4000);
}
bootstrap();
