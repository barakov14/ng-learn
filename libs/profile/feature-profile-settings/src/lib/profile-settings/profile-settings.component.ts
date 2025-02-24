import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { ProfileHeaderComponent } from '@tt/profile/ui';
import { profileActions, ProfileService, selectCurrentUser } from '@tt/profile/data-access';
import { lastValueFrom } from 'rxjs';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AvatarUploadComponent } from '../avatar-upload/avatar-upload.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'tt-profile-settings',
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent implements OnInit {
  readonly #store = inject(Store);
  readonly #fb = inject(NonNullableFormBuilder);

  protected readonly profile = this.#store.selectSignal(selectCurrentUser);

  #avatarUrl: File | null = null;

  ngOnInit() {
    this.#store.dispatch(profileActions.fetchGetMe());
  }

  form = this.#fb.group({
    firstName: ['', [Validators.required]],
    lastName: [''],
    username: [{ value: '', disabled: true }, [Validators.required]],
    description: [''],
    stack: [''],
  });

  constructor() {
    effect(() => {
      // @ts-ignore
      this.form.patchValue({
        ...this.profile(),
        // @ts-ignore
        stack: this.mergeStack(this.profile()?.stack),
      });
    });
  }

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

  mergeStack(stack: string | null | []) {
    if (!stack) return '';
    if (Array.isArray(stack)) return stack.join(',');

    return stack;
  }

  onAvatarUpload(file: File) {
    this.#avatarUrl = file;
  }
}
