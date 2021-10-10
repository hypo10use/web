import { Pipe, PipeTransform } from '@angular/core';
import { Token } from "../services/wallet.service";

@Pipe({
  name: 'token'
})
export class TokenPipe implements PipeTransform {
  transform(value: number, token: Token): string {
    return (value / token.divider).toString();
  }
}
