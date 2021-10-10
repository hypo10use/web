import { Injectable } from '@angular/core';
import { SocketService } from "../socket.service";

@Injectable()
export class BetService {
  constructor(private socketService: SocketService) {}

  placeBet(amount: string | number): void {
    this.socketService.sendMessage({
      event: 'bet',
      amount,
    })
  }
}
