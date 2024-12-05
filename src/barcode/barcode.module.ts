import { Module } from '@nestjs/common';
import { BarcodeService } from './barcode.service';
import { BarcodeGateway } from './barcode.gateway';

@Module({
  providers: [BarcodeGateway, BarcodeService],
})
export class BarcodeModule {}
