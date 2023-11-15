import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMeseroComponent } from './homeM.component';

describe('HomeComponent', () => {
  let component: HomeMeseroComponent;
  let fixture: ComponentFixture<HomeMeseroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMeseroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMeseroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
