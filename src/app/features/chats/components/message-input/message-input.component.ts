import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  inject,
  input,
  output,
  Renderer2,
  viewChild,
} from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AvatarCircleComponent } from '../../../../shared/components/avatar-circle/avatar-circle.component';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';

@Component({
  selector: 'tt-message-input',
  imports: [AvatarCircleComponent, FastSvgComponent, ReactiveFormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent implements AfterViewInit {
  private readonly r2 = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);
  readonly sent = output<string>();
  protected readonly currentUser = inject(AuthService).currentUser;

  protected readonly messageInputEl =
    viewChild.required<ElementRef<HTMLTextAreaElement>>('messageInput');

  protected readonly messageText = new FormControl<string>('');

  ngAfterViewInit() {
    this.messageText.valueChanges
      .pipe(startWith(undefined), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.onTextAreaInput();
      });
  }

  onTextAreaInput() {
    const textarea = this.messageInputEl().nativeElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'style', textarea.scrollHeight + 'px');
  }

  onSendMessage() {
    if (!this.messageText.value) return;
    this.sent.emit(this.messageText.value);
    this.messageText.reset();
  }
}
