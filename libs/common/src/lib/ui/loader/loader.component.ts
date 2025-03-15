import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
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
        color: var(--primary-color);
        font-size: 10px;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        position: relative;
        text-indent: -9999em;
        animation: mulShdSpin 1.3s infinite linear;
        transform: translateZ(0);
      }

      @keyframes mulShdSpin {
        0%,
        100% {
          box-shadow:
            0 -3em 0 0.2em,
            2em -2em 0 0em,
            3em 0 0 -1em,
            2em 2em 0 -1em,
            0 3em 0 -1em,
            -2em 2em 0 -1em,
            -3em 0 0 -1em,
            -2em -2em 0 0;
        }
        12.5% {
          box-shadow:
            0 -3em 0 0,
            2em -2em 0 0.2em,
            3em 0 0 0,
            2em 2em 0 -1em,
            0 3em 0 -1em,
            -2em 2em 0 -1em,
            -3em 0 0 -1em,
            -2em -2em 0 -1em;
        }
        25% {
          box-shadow:
            0 -3em 0 -0.5em,
            2em -2em 0 0,
            3em 0 0 0.2em,
            2em 2em 0 0,
            0 3em 0 -1em,
            -2em 2em 0 -1em,
            -3em 0 0 -1em,
            -2em -2em 0 -1em;
        }
        37.5% {
          box-shadow:
            0 -3em 0 -1em,
            2em -2em 0 -1em,
            3em 0em 0 0,
            2em 2em 0 0.2em,
            0 3em 0 0em,
            -2em 2em 0 -1em,
            -3em 0em 0 -1em,
            -2em -2em 0 -1em;
        }
        50% {
          box-shadow:
            0 -3em 0 -1em,
            2em -2em 0 -1em,
            3em 0 0 -1em,
            2em 2em 0 0em,
            0 3em 0 0.2em,
            -2em 2em 0 0,
            -3em 0em 0 -1em,
            -2em -2em 0 -1em;
        }
        62.5% {
          box-shadow:
            0 -3em 0 -1em,
            2em -2em 0 -1em,
            3em 0 0 -1em,
            2em 2em 0 -1em,
            0 3em 0 0,
            -2em 2em 0 0.2em,
            -3em 0 0 0,
            -2em -2em 0 -1em;
        }
        75% {
          box-shadow:
            0em -3em 0 -1em,
            2em -2em 0 -1em,
            3em 0em 0 -1em,
            2em 2em 0 -1em,
            0 3em 0 -1em,
            -2em 2em 0 0,
            -3em 0em 0 0.2em,
            -2em -2em 0 0;
        }
        87.5% {
          box-shadow:
            0em -3em 0 0,
            2em -2em 0 -1em,
            3em 0 0 -1em,
            2em 2em 0 -1em,
            0 3em 0 -1em,
            -2em 2em 0 0,
            -3em 0em 0 0,
            -2em -2em 0 0.2em;
        }
      }
    `,
  ],
})
export class LoaderComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly isLoading = signal<boolean>(false);

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
