import { Test, TestingModule } from '@nestjs/testing';
import { BarcodeGateway } from './barcode.gateway';
import { BarcodeService } from './barcode.service';

describe('BarcodeGateway', () => {
  let gateway: BarcodeGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BarcodeGateway, BarcodeService],
    }).compile();

    gateway = module.get<BarcodeGateway>(BarcodeGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
