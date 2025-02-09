import {
  computed,
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';

/**
 * ttCurrentUserMakeVisible — Показывает элемент ТОЛЬКО владельцу профиля
 */
@Directive({
  selector: '[ttCurrentUserMakeVisible]',
})
export class CurrentUserMakeVisibleDirective {
  readonly profileId = input.required<number>({ alias: 'ttCurrentUserMakeVisible' });

  private readonly authService = inject(AuthService);
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainer = inject(ViewContainerRef);

  private readonly shouldShow = computed(() => {
    const currentUser = this.authService.currentUser();
    return currentUser?.id === this.profileId();
  });

  constructor() {
    effect(() => {
      this.viewContainer.clear();
      if (this.shouldShow()) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}

/**
 * ttUserMakeNotVisible — Скрывает элемент ДЛЯ владельца профиля (показывает всем остальным)
 */
@Directive({
  selector: '[ttCurrentUserMakeNotVisible]',
})
export class UserMakeNotVisibleDirective {
  readonly profileId = input.required<number>({ alias: 'ttCurrentUserMakeNotVisible' });

  private readonly authService = inject(AuthService);
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainer = inject(ViewContainerRef);

  private readonly shouldShow = computed(() => {
    const currentUser = this.authService.currentUser();
    return currentUser?.id !== this.profileId();
  });

  constructor() {
    effect(() => {
      this.viewContainer.clear();
      if (this.shouldShow()) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
