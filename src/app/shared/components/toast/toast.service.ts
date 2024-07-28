import { Injectable, TemplateRef } from '@angular/core';
import {isEqual} from 'lodash';

export interface Toast {
	content?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  show(header: string, body: string, delay: number = 5000) {
    let toast ={ header, body, delay,show: true };
    this.toasts.push(toast);

    setTimeout(() => {
      this.hide(toast);
    }, delay)
  }

  hide(toast: any) {
    toast.show = false;
    setTimeout(() => {this.remove(toast)}, 300)
  }
  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
