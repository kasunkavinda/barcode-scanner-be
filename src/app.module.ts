import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarcodeModule } from './barcode/barcode.module';

@Module({
  imports: [BarcodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
