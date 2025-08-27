import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { Match, MatchSchema } from './schemas/match.schema';
import { Commentary, CommentarySchema } from './schemas/commentary.schema';
import { CounterService } from '../common/counter.service';
import { MatchesGateway } from './matches.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Match.name, schema: MatchSchema },
      { name: Commentary.name, schema: CommentarySchema },
    ]),
  ],
  controllers: [MatchesController],
  providers: [MatchesService, CounterService, MatchesGateway],
})
export class MatchesModule {}
