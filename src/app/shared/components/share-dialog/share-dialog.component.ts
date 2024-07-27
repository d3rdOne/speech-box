import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-share-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './share-dialog.component.html',
  styleUrl: './share-dialog.component.scss'
})
export class ShareDialogComponent {
  constructor(public modalRef: BsModalRef, private formBuilder: FormBuilder){}

  shareForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]]
  })

}
