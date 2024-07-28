import { Routes } from "@angular/router";
import { SpeechResolver } from "../../core/resolvers/speech-resolver.service";

export const speechRoutes: Routes = [
  {
    title: 'Create Speech',
    path: 'new',
    loadComponent: () => import(`./views/new-speech/new-speech.component`).then(a => a.NewSpeechComponent)
  },
  {
    title: 'Speech Details',
    path: ':id',
    resolve: {speechId:  SpeechResolver},
    loadComponent: () => import('./views/speech-details/speech-details.component').then(a => a.SpeechDetailsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
]