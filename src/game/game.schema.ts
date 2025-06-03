import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  genre: string;

  @Prop()
  releaseDate: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);
