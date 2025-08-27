import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
  constructor(private matchesService: MatchesService) {}

  @Post('start')
  async startMatch(@Body() body: { teamA: string; teamB: string }) {
    return this.matchesService.startMatch(body.teamA, body.teamB);
  }

  @Post(':id/commentary')
  async addCommentary(
    @Param('id') id: number,
    @Body() body: { over: number; ball: number; eventType: string; description?: string },
  ) {
    return this.matchesService.addCommentary(Number(id), body.over, body.ball, body.eventType, body.description);
  }

  @Get(':id')
  async getMatchDetails(@Param('id') id: number) {
    return this.matchesService.getMatchDetails(Number(id));
  }
}
