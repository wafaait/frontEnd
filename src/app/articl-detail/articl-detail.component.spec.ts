import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlDetailComponent } from './articl-detail.component';

describe('ArticlDetailComponent', () => {
  let component: ArticlDetailComponent;
  let fixture: ComponentFixture<ArticlDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
