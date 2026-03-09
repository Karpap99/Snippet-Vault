/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SnippetDocument = HydratedDocument<Snippet>;

@Schema({ timestamps: true })
export class Snippet {
  @Prop({ required: true })
  title!: string;

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  tags?: string[];

  @Prop({ enum: ['link', 'note', 'command'], required: true })
  type!: 'link' | 'note' | 'command';
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);
