import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements AfterViewInit{
  @ViewChildren('toastElem')
  toastElements!: QueryList<ElementRef>;

  constructor(public toastService: ToastService) {}

  ngAfterViewInit() {
    this.toastElements.changes.subscribe(() => {
      console.log('changes')
      this.toastElements.forEach((toastElem: ElementRef) => {
        const toastInstance = new Toast(toastElem.nativeElement, {
          autohide: true,
          delay: +toastElem.nativeElement.getAttribute('data-bs-delay')
        });
        toastInstance.show();
        toastElem.nativeElement.addEventListener('hidden.bs.toast', () => {
          this.toastService.remove(this.toastService.toasts.find(t => t.body === toastElem.nativeElement.querySelector('.toast-body').innerText));
        });
      });
    })

  }

}
