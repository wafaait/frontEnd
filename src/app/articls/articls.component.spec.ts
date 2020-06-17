import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlsComponent } from './articls.component';

describe('ArticlsComponent', () => {
  let component: ArticlsComponent;
  let fixture: ComponentFixture<ArticlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
