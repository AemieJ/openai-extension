import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TextModule } from './text/text.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://root:pass12345@mongodb:27017/shop?serverSelectionTimeoutMS=2000&authSource=admin`,
    ),
    TextModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
