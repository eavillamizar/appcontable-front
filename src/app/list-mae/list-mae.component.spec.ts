import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMaeComponent } from './list-mae.component';

describe('ListMaeComponent', () => {
  let component: ListMaeComponent;
  let fixture: ComponentFixture<ListMaeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMaeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
