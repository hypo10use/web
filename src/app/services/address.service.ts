import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private readonly _address$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  readonly address$: Observable<string | null> = this._address$.asObservable();

  setAddress(address: string): void {
    this._address$.next(address);
  }
}
