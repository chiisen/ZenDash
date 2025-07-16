import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TableDocument = Table & Document;

interface TreeNode {
  id: number;
  label: string;
  disabled: boolean;
  children?: TreeNode[];
}
@Schema({ versionKey: false })
export class Table {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  date: string;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  tree: Array<TreeNode>;
}

export const TableSchema = SchemaFactory.createForClass(Table);
