import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TextDocument = Text & Document;

@Schema()
export class Text {
  @Prop(String)
  text: string;

  @Prop(String)
  summary: string;

  @Prop(Number)
  priority: number;

  @Prop([String])
  tags: string[];

  @Prop(String)
  link: String;
}

export const TextSchema = SchemaFactory.createForClass(Text);
