import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Speech } from '../models/speech';
import { SPEECHES } from '../../mock-speeches';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const speeches = SPEECHES;

    return {speeches}
  }

  genId(speeches: Speech[]) {
    return speeches.length > 0 ? Math.max(...speeches.map(speech => speech.id)) + 1: 1;
  }
}
