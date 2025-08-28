import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesGateway } from './matches.gateway';

@Controller('matches')
export class MatchesController {
  constructor(private matchesService: MatchesService,private matchesGateway: MatchesGateway) {}

  @Post('start')
  async startMatch(@Body() body: { teamA: string; teamB: string }) {
    return this.matchesService.startMatch(body.teamA, body.teamB);
  }

  @Post(':id/commentary')
  async addCommentary(
    @Param('id') id: string,
    @Body() body: { over: number; ball: number; eventType: string; description?: string },
  ) {
    const matchId = Number(id);
    const match = await this.matchesService.addCommentary(
      matchId,
      body.over,
      body.ball,
      body.eventType,
      body.description,
    );

    // broadcast via Socket.IO
    this.matchesGateway.broadcastCommentary(matchId, body);

    return match;
  }

  @Get(':id')
  async getMatchDetails(@Param('id') id: number) {
    return this.matchesService.getMatchDetails(Number(id));
  }

  @Get()
  async getAllMatches() {
    return this.matchesService.getAllMatches();
  }
}
