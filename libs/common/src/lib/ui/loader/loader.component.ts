import { Component, DestroyRef, inject, model, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-loader',
  template: `
    @if (isLoading()) {
      <div class="overlay">
        <span class="loader"></span>
      </div>
    }
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        min-height: 100vh;
        background-color: rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }

      .loader {
        width: 48px;
        height: 48px;
        border: 5px solid var(--primary-color);
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
      }

      :host.no-overlay .overlay {
        position: static;
        display: block;
        width: 100%;
        height: 100%;
        background: none;
      }

      @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoaderComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoading = model<boolean>(false);

  ngOnInit() {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.isLoading.set(false);
      }
    });
  }
}
