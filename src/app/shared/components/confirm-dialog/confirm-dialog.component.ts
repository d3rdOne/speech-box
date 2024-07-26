import { Component, Input } from '@angular/core';
import { ConfirmDialogModal } from '../../../core/enums/enums';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { addSpeech } from '../../../features/speech/ngrx-store/speech.actions';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

  message: string = "Are you sure?"
  declineLabel: string  ='No';
  approveLabel: string = 'Yes';

  response: ConfirmDialogModal | undefined= undefined;
  constructor(private modalRef: BsModalRef) {}

  decline() {
    this.response = ConfirmDialogModal.DECLINE
    this.modalRef?.hide();
  }

  approve() {
    this.response = ConfirmDialogModal.APPROVE;
    this.modalRef?.hide();
  }
}
