import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as httpContext from 'express-http-context';
import * as responseTime from 'response-time';
import * as helmet from 'helmet';
import {getConfig, getHost, isLocal} from '../modules/common/config.provider';
import {Transport} from '@nestjs/common/enums/transport.enum';
import {INestApplication} from '@nestjs/common';

const serviceInfo = getConfig().get('service');

export const initializeServer = (app: INestApplication) => {
  const server = app.getHttpAdapter();
  server.use(helmet());
  server.use(bodyParser.urlencoded({extended: true}));
  server.use(bodyParser.json());
  server.use((req, res, next) => {
    res.setHeader('x-api-version', serviceInfo.apiVersion);
    res.setHeader('x-app-version', serviceInfo.appVersion);
    next();
  });
  server.use(httpContext.middleware);
  server.use(responseTime({header: 'x-response-time'}));

  return server;
};

export const initializeMessageQueue = async (app: INestApplication) => {
  try {
    const { urls, queue } = getConfig().get('rabbitmq');
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls,
        queue,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const initializeSwagger = (app) => {
  const server = app.getHttpAdapter();
  const options = new DocumentBuilder()
    .setTitle('Setel Maintenance API')
    .setDescription('API specification for Setel Maintenance service | [swagger.json](swagger.json)')
    .setVersion(serviceInfo.apiVersion)
    .setHost(getHost())
    .setSchemes(isLocal() ? 'http' : 'https')
    .addTag('health')
    .addTag('maintenance')
    .addBearerAuth('access-token', 'header')
    .setBasePath(serviceInfo.baseUrl)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  server.get(`${serviceInfo.docsBaseUrl}/swagger.json`, (req, res) => {
    // swagger json
    res.json(document);
  });
  SwaggerModule.setup(serviceInfo.docsBaseUrl, app, document, {
    swaggerOptions: {
      displayOperationId: true,
    },
  });
};
