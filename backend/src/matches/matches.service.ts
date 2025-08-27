import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match } from './schemas/match.schema';
import { Commentary } from './schemas/commentary.schema';
import { CounterService } from '../common/counter.service';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel(Match.name) private matchModel: Model<Match>,
    @InjectModel(Commentary.name) private commentaryModel: Model<Commentary>,
    private counterService: CounterService,
  ) {}

  async startMatch(teamA: string, teamB: string): Promise<Match> {
    const matchId = await this.counterService.getNextSequenceValue('matchId');
    const match = new this.matchModel({ matchId, teamA, teamB });
    return match.save();
  }

  async addCommentary(matchId: number, over: number, ball: number, eventType: string, description?: string) {
    const commentary = new this.commentaryModel({ matchId, over, ball, eventType, description });
    return commentary.save();
  }

  async getMatchDetails(matchId: number) {
    const match = await this.matchModel.findOne({ matchId });
    const commentary = await this.commentaryModel.find({ matchId });
    return { match, commentary };
  }
}
