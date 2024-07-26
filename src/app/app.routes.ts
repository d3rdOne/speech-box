import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { speechReducer, speechReducerKey } from './features/speech/ngrx-store/speech.reducers';

export const routes: Routes = [
  {
    path: 'speech',
    title:'Speech List',
    providers: [
      provideState({name: speechReducerKey , reducer: speechReducer})
    ],
    loadComponent: ()=> import(`./features/speech/views/speech-list.component`).then(a => a.SpeechListComponent),
    loadChildren: () => import('./features/speech/speech.routes').then(a => a.speechRoutes)
  },
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'speech'
  }

];
