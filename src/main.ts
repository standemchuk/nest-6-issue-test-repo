import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {initializeMessageQueue, initializeServer, initializeSwagger} from './shared/bootstrap';
import {getConfig, getPort} from './modules/common/config.provider';

const config = getConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  initializeServer(app);

  app.setGlobalPrefix(config.get('service.baseUrl'));

  initializeSwagger(app);
  await initializeMessageQueue(app);
  await app.startAllMicroservicesAsync();
  await app.listen(getPort());
}

bootstrap();
