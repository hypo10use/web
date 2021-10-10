import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Observable, of, ReplaySubject, Subject } from "rxjs";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { AddressService } from "../services/address.service";
import { WalletConnectionState, WalletService } from "../services/wallet.service";

@Component({
  selector: 'ergo-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private readonly addressesSubject$: Subject<string[]> = new ReplaySubject<string[]>(1);
  readonly addresses$: Observable<string[]> = this.addressesSubject$;
  readonly hasAddresses$: Observable<boolean> = this.addresses$.pipe(map(addresses => !!addresses && addresses.length > 0))
  readonly address: FormControl = new FormControl(null, [Validators.required]);

  constructor(private addressService: AddressService, private walletService: WalletService) {
    this.walletService.walletConnectionState$.pipe(switchMap((connectionState) => {
      if (connectionState === WalletConnectionState.CONNECTED) {
        return this.walletService.getUsedAddresses();
      } else {
        return of([]);
      }
    }), takeUntil(this.destroy$)).subscribe(addresses => {
      this.addressesSubject$.next(addresses)
    });
    this.address.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(address => {
      this.addressService.setAddress(address);
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
