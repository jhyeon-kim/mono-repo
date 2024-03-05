import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppRouter } from '@server/trpc/trpc.router';

/**
 * tRPC 라우터에서 Swagger 문서 데이터를 추출합니다.
 */
function generateSwaggerFromTrpc(appRouter: AppRouter) {
  const paths = {} as Record<string, any>;

  // tRPC 라우터의 각 엔드포인트를 반복하여 Swagger paths 객체를 구성합니다.
  for (const [key, procedure] of Object.entries(appRouter._def.procedures)) {
    const meta = procedure.meta?.openapi;
    if (meta) {
      const { method, path } = meta;
      const fullPath = `/trpc${path}`; // 경로 조합
      paths[fullPath] = {
        ...(paths[fullPath] || {}),
        [method.toLowerCase()]: {
          tags: [key],
          summary: `tRPC 함수 ${key}`,
          // 추가 파라미터, 응답 등을 여기에 정의
        },
      };
    }
  }

  return paths;
}

/**
 * NestJS 어플리케이션에 Swagger 문서를 설정하고, tRPC 엔드포인트를 포함시킵니다.
 */
export function setupSwaggerWithTrpc(
  app: INestApplication,
  appRouter: AppRouter,
) {
  const config = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('The example API description')
    .setVersion('1.0')
    .build();

  const trpcPaths = generateSwaggerFromTrpc(appRouter);
  const document = SwaggerModule.createDocument(app, config);
  Object.assign(document.paths, trpcPaths);
  SwaggerModule.setup('api-docs', app, document);
}
