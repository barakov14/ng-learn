import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../components/profile-header/profile-header.component';
import { ProfileService } from '../../services/profile.service';
import { lastValueFrom } from 'rxjs';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AvatarUploadComponent } from '../../components/avatar-upload/avatar-upload.component';

@Component({
  selector: 'tt-profile-settings',
  imports: [ProfileHeaderComponent, ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent {
  private readonly profileService = inject(ProfileService);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly profile = this.profileService.me;

  private avatarUrl: File | null = null;

  form = this.fb.group({
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

    lastValueFrom(
      this.profileService.patchProfile({
        ...this.form.getRawValue(),
        stack: this.splitStack(this.form.getRawValue().stack),
      }),
    );

    if (this.avatarUrl) {
      lastValueFrom(this.profileService.uploadAvatar(this.avatarUrl));
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
    this.avatarUrl = file;
  }
}
