import {ChangeDetectionStrategy, Component, DestroyRef, effect, inject, OnInit} from '@angular/core';
import {ProfileHeaderComponent} from '../../components/profile-header/profile-header.component';
import {ProfileService} from '../../services/profile.service';
import {firstValueFrom} from 'rxjs';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'tt-profile-settings',
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
  private readonly profileService = inject(ProfileService)
  private readonly fb = inject(NonNullableFormBuilder)
  private readonly destroyRef = inject(DestroyRef)



  profile = this.profileService.me;


  form = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: [''],
    username: [{value: '', disabled: true}, [Validators.required]],
    description: [''],
    stack: ['']
  })

  constructor() {
    effect(() => {
      // @ts-ignore
      this.form.patchValue({
        ...this.profile(),
        // @ts-ignore
        stack: this.mergeStack(this.profile()?.stack)
      })
    });
  }

  onSave(){
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if(this.form.invalid) return;


    //@ts-ignore
    firstValueFrom(this.profileService.patchProfile({
      ...this.form.getRawValue(),
      // @ts-ignore
      stack: this.splitStack(this.form.getRawValue().stack)
    }))
  }


  splitStack(stack: string | null | string[]): string[] {
    if(!stack) return [];
    if(Array.isArray(stack)) return stack;

    return stack.split(',');
  }

  mergeStack(stack: string | null | []) {
    if(!stack) return '';
    if(Array.isArray(stack)) return stack.join(',');

    return stack;
  }
}
