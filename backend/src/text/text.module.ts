import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextController } from './text.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Text, TextSchema } from './entities/text.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: 'Text', useFactory: () => TextSchema },
    ]),
  ],
  controllers: [TextController],
  providers: [TextService],
})
export class TextModule {}
