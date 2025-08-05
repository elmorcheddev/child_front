import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducateurComponent } from './educateur.component';

describe('EducateurComponent', () => {
  let component: EducateurComponent;
  let fixture: ComponentFixture<EducateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducateurComponent]
    });
    fixture = TestBed.createComponent(EducateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
