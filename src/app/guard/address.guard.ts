import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AddressService } from "../services/address.service";

@Injectable({
  providedIn: 'root'
})
export class AddressGuard implements CanActivate {
  constructor(private addressService: AddressService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.addressService.address$.pipe(map(address => {
      if (!!address) {
        return true;
      }
      return this.router.parseUrl('');
    }));
  }
}
