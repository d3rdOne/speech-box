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
    this.toasts.push({ header, body, delay });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
