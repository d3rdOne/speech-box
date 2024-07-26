import { Injectable } from '@angular/core';
import { Speech } from '../models/speech';
import { SpeechService } from '../../features/speech/services/speech.service';
import { ActivatedRouteSnapshot, Resolve, Router, } from '@angular/router';
import { catchError, EMPTY, Observable,  of,  switchMap,  take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechResolver implements Resolve<number>{

  constructor(private speechService: SpeechService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<number>| Promise<number>| number {
    let id = route?.paramMap.get('id') || '0';
    return this.speechService.getSpeech(id).pipe(take(1), catchError((error) => {
      this.router.navigateByUrl('/speech')
      return EMPTY
    }),
    switchMap(() => of(+id))
  );
  }

}
