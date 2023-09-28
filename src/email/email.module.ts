import { Module } from '@nestjs/common';
import { EmailListener } from './services/email.listener';

@Module({
  imports: [],
  providers: [EmailListener],
})
export class EmailModule {}
