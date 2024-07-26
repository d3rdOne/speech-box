import { Injectable, TemplateRef } from '@angular/core';
import {isEqual} from 'lodash';

export interface Toast {
	content?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: Toast[] = [];
  open: boolean = false;
  constructor() { }


  show(toast:Toast) {
    this.toasts.push(toast)
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => !isEqual(t, toast))
  }
  openToast() {
    this.open = true;

  }

  closeToast() {
    this.open = false;
  }
}
