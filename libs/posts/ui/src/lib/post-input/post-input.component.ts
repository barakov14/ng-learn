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
import { AvatarCircleComponent } from '@tt/common/ui';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@tt/auth/data-access';
import { startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-post-input',
  imports: [AvatarCircleComponent, FastSvgComponent, ReactiveFormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostInputComponent implements AfterViewInit {
  private readonly r2 = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  readonly profile = this.authService.currentUser;
  readonly isCommentInput = input<boolean>(false);
  readonly postId = input<number>();
  readonly created = output<string>();

  protected readonly postInputEl = viewChild.required<ElementRef<HTMLTextAreaElement>>('postInput');

  protected readonly postText = new FormControl<string>('');

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput();
  }

  ngAfterViewInit() {
    this.postText.valueChanges
      .pipe(startWith(undefined), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.onTextAreaInput();
      });
  }

  onTextAreaInput() {
    const textarea = this.postInputEl().nativeElement;

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'style', textarea.scrollHeight + 'px');
  }

  onCreate() {
    if (!this.postText.value) return;

    this.created.emit(this.postText.value);
  }
}
