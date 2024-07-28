import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDatepickerConfig, BsDatepickerDirective, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormMode } from '../../../../core/enums/enums';
import { CommonModule } from '@angular/common';
import { Speech } from '../../../../core/models/speech';
import { TextAreaAutoResizeDirective } from '../../../../shared/directives/text-area-auto-resize.directive';
import { InputPillsComponent } from "../../../../shared/components/input-pills/input-pills.component";

@Component({
  selector: 'app-speech-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, BsDatepickerModule, TextAreaAutoResizeDirective, InputPillsComponent],
  templateUrl: './speech-form.component.html',
  styleUrl: './speech-form.component.scss'
})
export class SpeechFormComponent {


  constructor(private formBuilder: FormBuilder) {
  }
  @Input() mode = FormMode.NEW;
  @Input() speechData: Speech | undefined;
  @Output() formSubmitted = new EventEmitter<Speech>();
  @Output() cancel = new EventEmitter();

  bsConfig?: Partial<BsDatepickerConfig>;
  speechForm: FormGroup=  this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(10)]],
    content:['', [Validators.required, Validators.minLength(10)]],
    author: ['',[Validators.required]],
    keywords: [[],[Validators.required]],
    date: ['', [Validators.required]]
  });

  ngOnInit() {
    switch(this.mode) {
      case FormMode.EDIT:
        this.populateForm(<Speech>this.speechData);
        break;
    }

    this.bsConfig = {
      containerClass: 'theme-default'
    }
  }

  populateForm(speech: Speech) {
    this.speechForm.controls['title'].setValue(speech.title)
    this.speechForm.controls['content'].setValue(speech.content);
    this.speechForm.controls['author'].setValue(speech.author);
    this.speechForm.controls['date'].setValue(new Date(speech.date));
    this.speechForm.controls['keywords'].setValue(speech.keywords);
  }

  formSubmit() {
    const speech = this.speechForm.getRawValue();
    this.formSubmitted.emit(speech)
  }

  get FormMode() {
    return FormMode
  }
}
