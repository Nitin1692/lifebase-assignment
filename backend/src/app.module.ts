
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://nj5930595:YCORpV7AMRZF3soD@fomofactory.kas6lb3.mongodb.net/',{dbName: 'lifebase'}), MatchesModule],

})
export class AppModule {}
