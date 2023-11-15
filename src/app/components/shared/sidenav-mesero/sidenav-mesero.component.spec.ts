import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavMeseroComponent } from './sidenav-mesero.component';

describe('SidenavMeseroComponent', () => {
  let component: SidenavMeseroComponent;
  let fixture: ComponentFixture<SidenavMeseroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavMeseroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavMeseroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
