// src/table/table.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Table, TableDocument } from './table.schema';
@Injectable()
export class TableService {
  constructor(
    @InjectModel(Table.name) private tableModel: Model<TableDocument>,
  ) {}
  async create(createGameDto: any): Promise<Table> {
    const newGame = new this.tableModel(createGameDto);
    return newGame.save();
  }

  async findAll(): Promise<Table[]> {
    return this.tableModel.find().exec();
  }

  async findOne(id: string): Promise<Table> {
    return this.tableModel.findById(id).exec();
  }

  async update(id: string, updateGameDto: any): Promise<Table> {
    console.log(updateGameDto);
    return this.tableModel
      .findByIdAndUpdate(id, updateGameDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Table> {
    return this.tableModel.findByIdAndDelete(id).exec();
  }
}
