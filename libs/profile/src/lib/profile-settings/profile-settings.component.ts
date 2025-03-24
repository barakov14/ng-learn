import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';
import { ProfileHeaderComponent } from '../ui/profile-header/profile-header.component';
import { ProfileService } from '@tt/profile';
import { TtAddressInputComponent, TtInputTagComponent } from '@tt/common';
import { profileActions } from '../data-access/store/profile.actions';

@Component({
  selector: 'tt-profile-settings',
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    AvatarUploadComponent,
    TtInputTagComponent,
    TtAddressInputComponent,
  ],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent {
  readonly #store = inject(Store);
  readonly #fb = inject(NonNullableFormBuilder);

  readonly #profileService = inject(ProfileService);

  protected readonly profile = computed(() => {
    const profile = this.#profileService.me();

    if (profile) {
      this.form.patchValue({
        ...profile,
      });
    }
    return profile;
  });

  #avatarUrl: File | null = null;

  form = this.#fb.group({
    firstName: ['', [Validators.required]],
    lastName: [''],
    username: [{ value: '', disabled: true }, [Validators.required]],
    description: [''],
    stack: new FormControl<string[]>([], { nonNullable: true }),
    city: new FormControl<string>('', { nonNullable: true }),
  });

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    this.#store.dispatch(
      profileActions.fetchPatchProfile({
        data: {
          ...this.form.value,
          stack: this.splitStack(this.form.getRawValue().stack),
        },
      }),
    );

    if (this.#avatarUrl) {
      this.#store.dispatch(
        profileActions.fetchUploadAvatar({
          imageUrl: this.#avatarUrl,
        }),
      );
    }
  }

  splitStack(stack: string | null | string[]): string[] {
    if (!stack) return [];
    if (Array.isArray(stack)) return stack;

    return stack.split(',');
  }

  onAvatarUpload(file: File) {
    this.#avatarUrl = file;
  }
}
