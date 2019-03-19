import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {CommonModule} from './modules/common/common.module';
import {HealthModule} from './modules/health/health.module';
import {createMongooseOptions} from './shared/helpers';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => createMongooseOptions('mongodb.maintenance.uri'),
    }),
    CommonModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
