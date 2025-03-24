import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'tt-input',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './tt-input.component.html',
  styleUrl: './tt-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtInputComponent),
    },
  ],
})
export class TtInputComponent implements ControlValueAccessor {
  readonly placeholder = input<string>();
  readonly type = input<'text' | 'password'>('text');
  readonly disabled = signal(false);
  readonly value = signal<string | null>('');

  private onChange: (obj: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(obj: string | null): void {
    this.value.set(obj);
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onModelChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.onChange(target.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}
