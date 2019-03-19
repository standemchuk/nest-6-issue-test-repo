import {Test} from '@nestjs/testing';
import {HealthController} from './health.controller';

describe('Health controller', () => {
  let healthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    healthController = module.get<HealthController>(HealthController);
  });

  describe('indexHealth()', () => {
    it('should return a response to indicate the healthiness of the service', async () => {
      expect(await healthController.indexHealth()).toEqual({healthy: true});
    });
  });
});
