import { Module } from '@nestjs/common';
import { BaseEntity } from 'typeorm';

@Module({
  exports: [BaseEntity],
})
export class CommonModule {}
