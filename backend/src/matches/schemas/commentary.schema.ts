import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Commentary extends Document {
  @Prop({ required: true })
  matchId: number;

  @Prop({ required: true })
  over: number;

  @Prop({ required: true })
  ball: number;

  @Prop({ required: true })
  eventType: string; // run, wicket, wide, etc.

  @Prop()
  description: string;
}

export const CommentarySchema = SchemaFactory.createForClass(Commentary);
