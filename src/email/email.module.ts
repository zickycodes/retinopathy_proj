import { Module } from '@nestjs/common';
import { EmailListener } from './email.listener';
// import { EmailListener } from 'src/email/email.event';

@Module({
  imports: [],
  providers: [EmailListener],
})
export class EmailModule {}
