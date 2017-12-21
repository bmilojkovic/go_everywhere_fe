import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefendingComponent } from './defending.component';

describe('DefendingComponent', () => {
  let component: DefendingComponent;
  let fixture: ComponentFixture<DefendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
