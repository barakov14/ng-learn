import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '@tt/common';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {
    customTimer(200)
      .pipe(takeUntil(customTimeout(3000)))
      .subscribe({
        next: console.log,
        complete: () => console.log('stream completed'),
      });
  }
}

export const customTimer = (time: number) => {
  return new Observable<number>((subscriber) => {
    let start = 0;

    const interval = setInterval(() => {
      start += time;
      subscriber.next(start);
    }, time);

    return () => {
      clearInterval(interval);
      console.log('destroying');
    };
  });
};

export const customTimeout = (timeout: number) => {
  return new Observable<void>((subscriber) => {
    const timer = setTimeout(() => {
      subscriber.complete();
    }, timeout);

    return () => {
      clearTimeout(timer);
      console.log('timeout destroyed');
    };
  });
};
