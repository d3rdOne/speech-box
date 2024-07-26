import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSpeechComponent } from './new-speech.component';

describe('NewSpeechComponent', () => {
  let component: NewSpeechComponent;
  let fixture: ComponentFixture<NewSpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSpeechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
