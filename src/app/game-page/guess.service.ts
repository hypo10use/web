import { Injectable } from '@angular/core';
import { SocketService } from "../socket.service";

@Injectable()
export class GuessService {
  constructor(private socketService: SocketService) {}

  makeGuess(amount: string | number): void {
    this.socketService.sendMessage({
      event: 'guess',
      amount,
    })
  }
}
