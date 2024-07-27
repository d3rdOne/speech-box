import { Component, effect, OnDestroy, OnInit, Signal, signal, untracked } from '@angular/core';
import { delay, filter, map, mergeMap, Observable, of, Subject, switchMap, take, takeUntil, tap, } from 'rxjs';
import { Speech } from '../../../core/models/speech';
import { SpeechService } from '../services/speech.service';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from '../components/list-item/list-item.component';
import { SearchSpeechComponent } from '../components/search-speech/search-speech.component';
import {  ActivatedRoute, NavigationEnd, Router, RouterOutlet, Scroll } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteMultipleSpeech, storeSpeechList, toggleAllSpeech, toggleSpeech } from '../ngrx-store/speech.actions';
import { allSpeechSelected, getFavoriteSpeeches, getSelectedSpeechesCount, getSpeeches, someSpeechSelected } from '../ngrx-store/speech.selectors';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModal, Folder } from '../../../core/enums/enums';
import { isEmpty, isNull } from 'lodash-es';
import { ToastService } from '../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-speech-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent, SearchSpeechComponent,RouterOutlet ],
  templateUrl: './speech-list.component.html',
  styleUrl: './speech-list.component.scss',
  providers: [BsModalService]
})
export class SpeechListComponent implements OnInit, OnDestroy {

  speeches$ : Observable<Speech[]> = this.store.select<Speech[]>(getSpeeches)

  someSelected$ = this.store.select<boolean>(someSpeechSelected);
  allSelected$ = this.store.select<boolean>(allSpeechSelected);

  childActive = signal(false);
  childRouteId: number = -1;
  unsubscribe$: Subject<boolean> = new Subject();
  folderCurrent = signal(Folder.SPEECHES);

  constructor(public speechService: SpeechService, public router: Router,  private route: ActivatedRoute, private store: Store, private modalService: BsModalService, private toastService: ToastService) {
    // Listen for Folder changes and update selector accordingly
    effect(() => {
      const folder= this.folderCurrent();
      untracked(() => {
        switch(folder) {
          case Folder.SPEECHES:
            this.speeches$ = this.store.select<Speech[]>(getSpeeches);
            break;
          case Folder.FAVORITES:
            this.speeches$ = this.store.select<Speech[]>(getFavoriteSpeeches);
            break;
        }
        this.store.dispatch(toggleAllSpeech({checked: false}))
      })
    })
  }

  ngOnInit() {

    // Set child active to true if child route is active
    this.childActive.set(this.route.firstChild? true: false);

    // Check if speech details is displayed and assign to childRouteId
    // This is only triggered when page is refreshed or initially loaded with child route active
    if(this.route?.firstChild?.params) {
      this.route?.firstChild?.params.subscribe(({id}) => {this.childRouteId = id})
    }

    // Listen to route for child routes being rendered and update signal value
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd || event instanceof Scroll),
      switchMap(
        () =>
          of(this.route?.firstChild && this.route.firstChild.params ?true : false)
      ),
    ).subscribe(value => this.childActive.set(value));

    // Fetch speech list from service
    this.fetchSpeechList();
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next(false);
    this.unsubscribe$.complete();
  }

  closePanel() {
    this.childRouteId = -1;
    this.router.navigateByUrl('/speech');
  }

  fetchSpeechList() {
    this.speechService.getSpeeches().subscribe(speeches =>
      this.store.dispatch(storeSpeechList({speeches}))
    )
  }

  listItemClicked(speech: {id: number}) {
    this.childRouteId = speech.id;
    this.router.navigate(['/speech', speech.id])
  }

  speechSelected(value: {id: number, checked: boolean}) {
    this.store.dispatch(toggleSpeech(value));
  }

  speechToggleAll(event: any) {
    const { checked} = event.target;
    this.store.dispatch(toggleAllSpeech({checked}))
  }

  multiDeleteSpeech() {
    let modalUnsubscribe$ = new Subject();
    let deleteModalRef: BsModalRef = this.modalService.show(ConfirmDialogComponent, {
      initialState: {
        message: 'Are your sure you want to delete?'
      },
      class: "delete-modal modal-dialog-centered"
    })

    deleteModalRef.onHidden?.pipe(
      takeUntil(modalUnsubscribe$),
      tap(() => {
          // Delete speech from speech list
          if(deleteModalRef.content.response === ConfirmDialogModal.APPROVE) {
            this.store.dispatch(deleteMultipleSpeech())
          }
        }
      ),
      switchMap(() => this.getChildRouteIdAndSpeeches())
    ).subscribe((data) => {

      if(!isNull(data)) {

        this.toastService.show('Success', 'Selected speech deleted!', 3000)
        // Checks if active child route is still active
        // Navigate to speech list if not (closing the details pane)
        let {id, speeches} = data;
        if(isEmpty(speeches.find((speech) => speech.id == id))) {
          this.router.navigate(['/speech'])
        }
      }
    })
  }

  // Get id from active child route id and speeches,
  // returns null if NO active child route
  getChildRouteIdAndSpeeches() {
    let childRoute = this.route?.firstChild && this.route.firstChild.params;
    if(childRoute) {
       return childRoute.pipe(
        take(1),
        takeUntil(this.unsubscribe$),
        mergeMap(
          ({id}) => {
            return this.speeches$.pipe(map(speeches => {
              return {speeches,id: id}
            }))
          }
        ),
      )
    }
    return of(null);
  }


  get Folder() {
    return Folder;
  }
}
