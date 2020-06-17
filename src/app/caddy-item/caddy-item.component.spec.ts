import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaddyItemComponent } from './caddy-item.component';

describe('CaddyItemComponent', () => {
  let component: CaddyItemComponent;
  let fixture: ComponentFixture<CaddyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaddyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaddyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
