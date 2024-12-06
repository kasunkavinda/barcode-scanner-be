import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarcodeModule } from './barcode/barcode.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BarcodeModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes environment variables available globally
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
