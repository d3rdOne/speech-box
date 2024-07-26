import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Search } from '../../../../core/models/search';
import { SearchCategory } from '../../../../core/enums/enums';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { updateSearch } from '../../ngrx-store/speech.actions';

@Component({
  selector: 'app-search-speech',
  standalone: true,
  imports: [],
  templateUrl: './search-speech.component.html',
  styleUrl: './search-speech.component.scss'
})
export class SearchSpeechComponent implements OnInit {

  @Output() searchSpeech = new EventEmitter<Search>();

  searchSubject$ = new Subject<string>();
  searchTerm: string = ''
  searchCategory: SearchCategory = SearchCategory.TITLE;
  debounceTime = 1000;
  unsubscribe$ = new Subject();

  constructor(private store: Store) {}

  ngOnInit(): void {
     this.searchSubject$.pipe(debounceTime(this.debounceTime), takeUntil(this.unsubscribe$)).subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.dispatchUpdateSearch();
     })
  }

  ngOnDestroy() {
    this.unsubscribe$.next('');
    this.unsubscribe$.complete();
  }

  onSearch(searchValue: any) {
    this.searchSubject$.next(searchValue);
  }

  onSelectChange(value: any) {
    this.searchCategory = value;
    this.dispatchUpdateSearch();
  }

  dispatchUpdateSearch(){
    let search = {term: this.searchTerm, category: this.searchCategory}
    this.store.dispatch(updateSearch({search}));
  }

  getValue(event: Event): string | SearchCategory {
    return (event.target as HTMLInputElement).value;
  }



  get SearchCategory() {
    return SearchCategory
  }
}
