import { ChangeDetectionStrategy, Component, forwardRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TtInputComponent } from '../tt-input/tt-input.component';
import { DadataService } from '../../data-access/services/dadata.service';
import { debounceTime, filter, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-address-input',
  imports: [CommonModule, TtInputComponent, ReactiveFormsModule],
  templateUrl: './tt-address-input.component.html',
  styleUrl: './tt-address-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TtAddressInputComponent),
      multi: true,
    },
  ],
})
export class TtAddressInputComponent implements ControlValueAccessor {
  readonly #dadataService = inject(DadataService);
  protected readonly innerSearchControl = new FormControl('');
  isDropdownOpened = signal<boolean>(false);

  protected readonly suggestions = toSignal(
    this.innerSearchControl.valueChanges.pipe(
      debounceTime(300),
      filter(Boolean),
      switchMap((query) => this.#dadataService.getSuggestion(query)),
      tap((res) => this.isDropdownOpened.set(res.length > 0)),
    ),
  );

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: string | null): void {
    this.innerSearchControl.patchValue(obj, {
      emitEvent: false,
    });
  }

  onChange(value: string): void {}

  onTouched() {}

  onSuggestionPick(value: string) {
    this.isDropdownOpened.set(false);
    this.innerSearchControl.patchValue(value, {
      emitEvent: false,
    });
    this.onChange(value);
  }
}
