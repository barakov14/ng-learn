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
import { AvatarCircleComponent } from '../../../../../shared/components/avatar-circle/avatar-circle.component';
import { Profile } from '../../../../../shared/models/profile.interface';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../auth/services/auth.service';
import { startWith } from 'rxjs';

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
    this.postText.valueChanges.pipe(startWith(undefined)).subscribe(() => {
      this.onTextAreaInput();
    });
  }

  onTextAreaInput() {
    const textarea = this.postInputEl().nativeElement;

    console.log(textarea);

    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'style', textarea.scrollHeight + 'px');
  }

  onCreate() {
    if (!this.postText.value) return;

    this.created.emit(this.postText.value);

    /*if(this.isCommentInput()) {
      await lastValueFrom(this.postsService.createComment({
        authorId: this.profile().id,
        text: this.postText,
        postId: this.postId()!
      }))
      this.created.emit()
    } else {
      await lastValueFrom(this.postsService.createPost({
        title: 'Angular is amazing',
        content: this.postText,
        authorId: this.profile().id,
      }))
    }*/
  }
}
