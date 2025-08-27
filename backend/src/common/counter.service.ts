import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

interface Counter {
  _id: string;
  seq: number;
}

@Injectable()
export class CounterService {
  constructor(@InjectConnection() private connection: Connection) {}

  async getNextSequenceValue(counterName: string): Promise<number> {
    const counters = this.connection.collection<Counter>('counters');

    const result = await counters.findOneAndUpdate(
      { _id: counterName },                 // _id is a string
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: 'after' }
    );

    // If the operation somehow returns null (should not happen because of upsert)
    if (!result || !result._id) {
      // Initialize counter if missing
      await counters.insertOne({ _id: counterName, seq: 1 });
      return 1;
    }

    return result.seq;
  }
}
