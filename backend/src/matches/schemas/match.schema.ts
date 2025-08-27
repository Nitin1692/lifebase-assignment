import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Match extends Document {
  @Prop({ required: true })
  matchId: number; // 4-digit unique ID

  @Prop({ required: true })
  teamA: string;

  @Prop({ required: true })
  teamB: string;

  @Prop({ default: Date.now })
  startTime: Date;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
