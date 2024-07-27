import { Component } from '@angular/core';

import { LayoutService } from './layout.service';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { ToastService } from '../../shared/components/toast/toast.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ToastComponent ],
  providers: [LayoutService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor(public toastService :ToastService) {}

}
