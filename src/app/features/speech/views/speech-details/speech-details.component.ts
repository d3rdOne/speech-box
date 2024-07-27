import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Speech } from '../../../../core/models/speech';
import { CommonModule, DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { deleteSpeech, toggleFavoriteSpeech, updateSpeech } from '../../ngrx-store/speech.actions';
import { getSpeech } from '../../ngrx-store/speech.selectors';
import { ConfirmDialogModal, FormMode } from '../../../../core/enums/enums';
import { SpeechFormComponent } from '../../components/speech-form/speech-form.component';

import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { share, Subject, takeUntil } from 'rxjs';
import { ShareDialogComponent } from '../../../../shared/components/share-dialog/share-dialog.component';
import { ToastService } from '../../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-speech-details',
  standalone: true,
  imports: [DatePipe, CommonModule, SpeechFormComponent],
  templateUrl: './speech-details.component.html',
  styleUrl: './speech-details.component.scss',
  providers: [BsModalService]
})
export class SpeechDetailsComponent implements OnInit{

  deleteDialogRef?: BsModalRef;

  speechId: number = 0;
  speech$ = this.store.select(getSpeech(this.speechId));
  mode: FormMode = FormMode.VIEW

  constructor(private activatedRoute: ActivatedRoute, private store : Store, private router: Router, private modalService: BsModalService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({speechId}) => {
      this.speechId = speechId;
      this.speech$ = this.store.select(getSpeech(this.speechId));
      this.mode = FormMode.VIEW;
    })
  }

  toggleFavoriteSpeech(speech: Speech) {
    this.store.dispatch(toggleFavoriteSpeech({id: speech.id, favorite: !speech?.favorite }))

  }

  deleteSpeech(speech: Speech) {
    let unsubscribe$ = new Subject();
    this.deleteDialogRef = this.modalService.show(ConfirmDialogComponent, {
      initialState: {
        message: `Are you sure, you want to delete, '${speech.title}'?`
      },
      class: 'delete-modal modal-dialog-centered',
      ignoreBackdropClick: true
    })
    this.deleteDialogRef.onHidden?.pipe(takeUntil(unsubscribe$)).subscribe( () => {

      if(this.deleteDialogRef?.content.response === ConfirmDialogModal.APPROVE) {
        this.store.dispatch(deleteSpeech({id: speech.id}))
        this.router.navigate(['/speech'])
      }
      // TODO: Toast 'deleted'
      this.toastService.show('Success', 'Speech deleted!', 3000)
      unsubscribe$.next('');
      unsubscribe$.complete();
    })
  }

  shareSpeech(speech: Speech) {
    let unsubscribe$ = new Subject();
    let shareDialogRef = this.modalService.show(ShareDialogComponent, {
      class: 'share-modal modal-dialog-centered',
      ignoreBackdropClick: true
    })

    shareDialogRef.onHidden?.pipe(takeUntil(unsubscribe$)).subscribe(() => {
      let form = shareDialogRef.content?.shareForm.getRawValue();
      if(form && form?.email) {
        this.toastService.show('Success', `Shared to ${form?.email}`, 3000)
      }
      unsubscribe$.next('');
      unsubscribe$.complete();
    })
  }

  saveSpeech(speech: Speech) {
    speech = {...speech, id: this.speechId};
    this.toastService.show('Success', 'Speech updated!', 3000)
    this.store.dispatch(updateSpeech({speech}));
    this.mode = FormMode.VIEW;
  }

  cancelSave() {
    this.mode = FormMode.VIEW;
  }

  get FormMode() {
    return FormMode;
  }


}
