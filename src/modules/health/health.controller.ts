import {Get, Controller, HttpStatus} from '@nestjs/common';
import {ApiUseTags, ApiOperation, ApiResponse} from '@nestjs/swagger';

@ApiUseTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'App is healthy',
  })
  @ApiOperation({
    operationId: 'indexHealth',
    title: 'Check if the application is healthy',
    description: `Ping pong endpoint for making sure the application is alive.
                  Used for healthcheck via orchestration services.`,
  })
  async indexHealth() {
    return {healthy: true};
  }
}
