import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Checkbox, MockService } from '../../services/mock.service';
import { KeyValuePipe } from '@angular/common';
import { NameValidator } from '../../services/name.validator';

export const ReceiverType = {
  PERSON: 'PERSON',
  LEGAL: 'LEGAL',
};

/*export const validateStartWith: ValidatorFn = (control: AbstractControl) => {
  return control.value.startsWith('я') ? { startsWith: 'Я - последняя буква алфавита' } : null;
};*/

function validateStartWith(forbiddenLetter: string): ValidatorFn {
  return (control: AbstractControl) => {
    return control.value.startsWith(forbiddenLetter)
      ? { startsWith: `${forbiddenLetter} - ф  10-231` }
      : null;
  };
}

function validateDateRange({
  fromControlName,
  toControlName,
}: {
  fromControlName: string;
  toControlName: string;
}): ValidatorFn {
  return (control: AbstractControl) => {
    const fromControl = control.get(fromControlName);
    const toControl = control.get(toControlName);

    if (!fromControl || !toControl) return null;

    const fromDate = new Date(fromControl.value);
    const toDate = new Date(toControl.value);

    return fromDate && toDate && fromDate > toDate
      ? { dateRange: { message: 'Дата начала не может быть позднее даты конца' } }
      : null;
  };
}

export const addressFormGroup = () => {
  return new FormGroup({
    city: new FormControl<string>(''),
    street: new FormControl<string>(''),
    house: new FormControl<string>(''),
    apartment: new FormControl<string>(''),
  });
};

@Component({
  selector: 'tt-experimental-reactive',
  imports: [ReactiveFormsModule, KeyValuePipe],
  templateUrl: './experimental-reactive.component.html',
  styleUrl: './experimental-reactive.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperimentalReactiveComponent {
  readonly #mockService = inject(MockService);
  readonly #nameValidator = inject(NameValidator);

  features = signal<Checkbox[]>([]);

  form = new FormGroup({
    type: new FormControl<string>('Samsung', [Validators.required]),
    model: new FormControl<string>('', [Validators.required, validateStartWith('з')]),
    reason: new FormControl<string>(''),
    date: new FormControl<string>(''),
    warrantyPeriod: new FormControl<string>(''),

    addresses: new FormArray([addressFormGroup()]),

    dateRange: new FormGroup(
      {
        start: new FormControl(),
        end: new FormControl(),
      },
      [validateDateRange({ fromControlName: 'start', toControlName: 'end' })],
    ),

    username: new FormControl<string>(
      '',
      [Validators.required],
      [this.#nameValidator.validate.bind(this.#nameValidator)],
    ),

    /*additional: new FormGroup({
      wifiModule: new FormControl<boolean>(false),
      smartTv: new FormControl<boolean>(false),
      antennaConnection: new FormControl<boolean>(false),
    }),*/
    additional: new FormRecord({}),
  });

  constructor() {
    this.form.controls.type.valueChanges.pipe(takeUntilDestroyed()).subscribe((val) => {
      this.form.controls.model.removeValidators([Validators.required]);
      // this.form.clearValidators();

      if (val === 'Samsung') {
        this.form.controls.model.setValidators([Validators.required]);
      }
    });

    const formPatch = {
      reason: 'no reasons',
    };

    this.#mockService
      .getAdditionals()
      .pipe(takeUntilDestroyed())
      .subscribe((features) => {
        this.features.set(features);

        for (const feature of features) {
          this.form.controls.additional.addControl(feature.control, new FormControl(feature.value));
        }
      });
    // this.form.patchValue(formPatch, {emitEvent: false});
    // this.form.setValue(formPatch)
  }

  submit() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;
    console.log(this.form.value);
    console.log(this.form.getRawValue());
  }

  addAddress() {
    this.form.controls.addresses.push(addressFormGroup(), { emitEvent: false });
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, { emitEvent: false });
  }
}
