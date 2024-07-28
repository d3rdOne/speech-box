import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, forwardRef, HostListener, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-pills',
  templateUrl: './input-pills.component.html',
  styleUrls: ['./input-pills.component.scss'],
  imports: [FormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPillsComponent),
      multi: true
    }
  ],
  standalone: true
})
export class InputPillsComponent implements ControlValueAccessor {
  @ViewChild('Input') inputElementRef!: ElementRef;
  @Input() label: string = 'Enter a text';
  pills: string[] = [];
  private onChange = (pills: string[]) => {};
  private onTouched = () => {};

  public focused = false;

  @HostListener('click')
  onClick() {
    this.inputElementRef.nativeElement.focus();
  }

  addPill(event: any) {
    const input = event.target;
    const value = input.value.trim();
    if (value && !this.pills.includes(value)) {
      this.pills.push(value);
      input.value = '';
      this.onChange(this.pills);
    }
  }

  removePill(pill: string) {
    this.pills =this.pills.filter(p => p !== pill)
    console.log(this.pills)
    this.onChange(this.pills);
  }

  writeValue(pills: string[]): void {
    if (pills) {
      this.pills = pills;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Optionally handle disabling the component
  }

  onFocus() {
    this.focused = false;
  }

  onFocusOut() {}
}