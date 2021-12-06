import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMaeComponent } from './create-mae.component';

describe('CreateMaeComponent', () => {
  let component: CreateMaeComponent;
  let fixture: ComponentFixture<CreateMaeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMaeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
