import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomewComponent } from './homew.component';

describe('HomewComponent', () => {
  let component: HomewComponent;
  let fixture: ComponentFixture<HomewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
