// src/table/table.controller.ts
import {
  Res,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { TableService } from './table.service';
import { Table } from './table.schema';
import { Response } from 'express';
import { LoggingInterceptor } from '../middleware/logging.interceptor';

@Controller('/api/table') // 修正路由名稱
@UseInterceptors(LoggingInterceptor)
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post('/tabledata')
  create(@Body() createGameDto: any, @Res() res: Response): any {
    this.tableService.create(createGameDto);
    return res.status(200).format({
      'application/json': function () {
        res.send('OK');
      },
    });
  }

  @Get('/tables')
  findAll(): Promise<Table[]> {
    return this.tableService.findAll();
  }

  @Get('/table:id')
  findOne(@Param('id') id: string): Promise<Table> {
    return this.tableService.findOne(id);
  }

  @Put('updatetalbe:id')
  update(@Param('id') id: string, @Body() updateGameDto: any): Promise<Table> {
    return this.tableService.update(id, updateGameDto);
  }

  @Delete('deletetable:id')
  delete(@Param('id') id: string): Promise<Table> {
    return this.tableService.delete(id);
  }
}
