import {MongooseModuleOptions} from '@nestjs/mongoose';
import {getConfig} from '../modules/common/config.provider';

export function createMongooseOptions(uriConfigPath: string): MongooseModuleOptions {
    return {
        uri: getConfig().get(uriConfigPath),
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    };
}