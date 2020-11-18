import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesReadComponent } from './articles-read.component';

describe('ArticlesReadComponent', () => {
  let component: ArticlesReadComponent;
  let fixture: ComponentFixture<ArticlesReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
