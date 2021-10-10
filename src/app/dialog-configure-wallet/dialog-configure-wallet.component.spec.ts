import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfigureWalletComponent } from './dialog-configure-wallet.component';

describe('DialogConfigureWalletComponent', () => {
  let component: DialogConfigureWalletComponent;
  let fixture: ComponentFixture<DialogConfigureWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfigureWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfigureWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
