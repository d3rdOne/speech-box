import { Component, Input, input, OnInit } from '@angular/core';
import { FormMode } from '../../../../core/enums/enums';
import { SpeechFormComponent } from '../../components/speech-form/speech-form.component';
import {  UpperCasePipe } from '@angular/common';
import { Speech } from '../../../../core/models/speech';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { SpeechService } from '../../services/speech.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addSpeech } from '../../ngrx-store/speech.actions';

@Component({
  selector: 'app-new-speech',
  standalone: true,
  imports: [SpeechFormComponent, UpperCasePipe],
  templateUrl: './new-speech.component.html',
  styleUrl: './new-speech.component.scss'
})
export class NewSpeechComponent  implements OnInit{

  constructor(private toastService: ToastService, private speechService: SpeechService, public router: Router ,private store: Store) {}
  ngOnInit() {
  }

  formSubmitted(speech: Speech) {
    this.speechService.addSpeech(speech).subscribe(speech => {
      this.store.dispatch(addSpeech({speech}))
      this.router.navigateByUrl('/speech')
    })
  }
  get FormMode() {
    return FormMode
  }
}

