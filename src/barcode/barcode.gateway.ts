import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { PrismaClient } from '@prisma/client';

export type BarcodeInput = {
  barcode: string;
};

@WebSocketGateway({
  cors: {
    origin: process.env.FE_URL, // Replace with your Next.js frontend URL
    credentials: true,
  },
}) // Enable CORS for the Next.js frontend
export class BarcodeGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket Server Initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('barcodex')
  async handleBarcode(@MessageBody() input: BarcodeInput): Promise<string> {
    const { barcode } = input;
    console.log(`Received barcode: ${JSON.stringify(barcode)}`);
    this.server.emit('barcodeResponse', `Processed barcode: ${barcode}`);

    const prisma = new PrismaClient();
    const record = await prisma.barCodeData.upsert({
      where: {
        barcode,
      },
      create: {
        barcode,
      },
      update: {
        barcode,
      },
    });

    return `Received: ${record}`;
  }
}

// import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
// import { BarcodeService } from './barcode.service';
// import { CreateBarcodeDto } from './dto/create-barcode.dto';
// import { UpdateBarcodeDto } from './dto/update-barcode.dto';

// @WebSocketGateway()
// export class BarcodeGateway {
//   constructor(private readonly barcodeService: BarcodeService) {}

//   @SubscribeMessage('createBarcode')
//   create(@MessageBody() createBarcodeDto: CreateBarcodeDto) {
//     return this.barcodeService.create(createBarcodeDto);
//   }

//   @SubscribeMessage('findAllBarcode')
//   findAll() {
//     return this.barcodeService.findAll();
//   }

//   @SubscribeMessage('findOneBarcode')
//   findOne(@MessageBody() id: number) {
//     return this.barcodeService.findOne(id);
//   }

//   @SubscribeMessage('updateBarcode')
//   update(@MessageBody() updateBarcodeDto: UpdateBarcodeDto) {
//     return this.barcodeService.update(updateBarcodeDto.id, updateBarcodeDto);
//   }

//   @SubscribeMessage('removeBarcode')
//   remove(@MessageBody() id: number) {
//     return this.barcodeService.remove(id);
//   }
// }
