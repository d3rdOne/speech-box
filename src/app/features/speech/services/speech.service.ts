import { Injectable, signal } from '@angular/core';
import { Speech } from '../../../core/models/speech';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject, take, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  private speechesUrl = `api/speeches`

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getSpeeches() {
    return this.http.get<Speech[]>(this.speechesUrl)
    .pipe(
      map((speechList) => {
        return speechList.map(speech => ({...speech, checked: false}))
      })
    )
  }

  getSpeech(id: number |string) : Observable<Speech> {
    const url = `${this.speechesUrl}/${id}`;
    return this.http.get<Speech>(url)
  }

  updateSpeech(speech: Speech): Observable<any> {
    return this.http.put(this.speechesUrl, speech, this.httpOptions).pipe(tap(data => console.log(data)))
  }

  addSpeech(speech: Speech): Observable<any> {
    return this.http.post<Speech>(this.speechesUrl, speech,this.httpOptions)
  }

}
