import { Module } from '@nestjs/common';
import { BaseEntity } from 'typeorm';

@Module({
  imports: [BaseEntity],
  exports: [BaseEntity],
})
export class CommonModule {}
