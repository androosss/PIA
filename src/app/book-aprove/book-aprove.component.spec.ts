import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAproveComponent } from './book-aprove.component';

describe('BookAproveComponent', () => {
  let component: BookAproveComponent;
  let fixture: ComponentFixture<BookAproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
