import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechDetailsComponent } from './speech-details.component';

describe('SpeechDetailsComponent', () => {
  let component: SpeechDetailsComponent;
  let fixture: ComponentFixture<SpeechDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeechDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeechDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
