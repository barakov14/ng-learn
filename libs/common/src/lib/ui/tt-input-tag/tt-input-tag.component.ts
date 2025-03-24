import { ChangeDetectionStrategy, Component, forwardRef, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';

@Component({
  selector: 'tt-input-tag',
  imports: [ReactiveFormsModule, FormsModule, FastSvgComponent],
  templateUrl: './tt-input-tag.component.html',
  styleUrl: './tt-input-tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TtInputTagComponent),
      multi: true,
    },
  ],
})
export class TtInputTagComponent implements ControlValueAccessor {
  onChange: (value: string[] | null) => void = () => {};
  onTouched: () => void = () => {};

  protected readonly tags = signal<string[]>([]);
  protected value = '';
  private ctrlAActive = false;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: string[] | null): void {
    this.tags.set(obj ? [...obj] : []);
  }

  onModelChange(val: string) {
    this.value = val;
  }

  onAddTag(event: Event) {
    if (this.value.trim().length === 0) return;
    event.preventDefault();

    const newTag = this.value.trim();

    this.tags.update((tags) => {
      const updated = [...tags, newTag];
      this.onChange(updated);
      return updated;
    });

    this.value = '';
  }

  onRemoveLastTag(event: Event) {
    if (this.value.length > 0) return;
    event.preventDefault();

    this.tags.update((tags) => {
      const updated = tags.slice(0, -1);
      this.onChange(updated);
      return updated;
    });
  }

  onRemoveTag(index: number) {
    this.tags.update((tags) => {
      const updated = [...tags.slice(0, index), ...tags.slice(index + 1)];
      this.onChange(updated);
      return updated;
    });
  }

  onClearTags() {
    this.tags.set([]);
    this.onChange([]);
  }

  onInputTouched() {
    this.onTouched();
  }

  onKeyDown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a') {
      this.ctrlAActive = true;
    }

    if (event.key === 'Enter') {
      this.onAddTag(event);
    }

    if (event.key === 'Backspace') {
      if (this.ctrlAActive) {
        this.onClearTags();
        this.ctrlAActive = false;
      } else if (this.value.length === 0) {
        this.onRemoveLastTag(event);
      }
    }
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'a' || event.key === 'Control' || event.key === 'Meta') {
      this.ctrlAActive = false;
    }
  }
}
