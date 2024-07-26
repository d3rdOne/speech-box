import { Component, EventEmitter, Input, input, output, Output } from '@angular/core';
import { Speech } from '../../../../core/models/speech';
import { CommonModule, DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SpeechService } from '../../services/speech.service';
import { toggleFavoriteSpeech } from '../../ngrx-store/speech.actions';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [UpperCasePipe, RouterLink, FormsModule, DatePipe, CommonModule, TitleCasePipe],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {

  @Input() speech:any ;
  @Input() active: boolean = false;
  @Output() selected = new EventEmitter<{id: number, checked: boolean}>()
  @Output() clicked = new EventEmitter<{id: number}>();

  constructor( private store: Store) {}
  isSelected: boolean = false;
  ngAfterViewInit() {
  }

  checkboxChanged(event: any) {
    this.selected.emit({id: event.target.value, checked: event.target.checked});
  }

  navigate(id: number) {
    this.clicked.emit({id})
  }

  toggleFavorite(id: number) {
    this.store.dispatch(toggleFavoriteSpeech({id: id, favorite: !this.speech?.favorite }))
  }
}
