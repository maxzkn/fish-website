import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticleNewComponent } from './admin-article-new.component';

describe('AdminArticleNewComponent', () => {
  let component: AdminArticleNewComponent;
  let fixture: ComponentFixture<AdminArticleNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArticleNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArticleNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
