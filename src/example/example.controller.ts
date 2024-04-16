import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('example')
@Controller('example')
@Controller('document-builder')
@Controller('example')
export class ExampleController {
  @Get()
  findAll() {
    return [];
  }
}
