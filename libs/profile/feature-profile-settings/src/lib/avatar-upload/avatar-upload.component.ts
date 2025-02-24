import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  input,
  output,
  signal,
} from '@angular/core';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { AvatarCircleComponent } from '@tt/common/ui';

@Component({
  selector: 'tt-avatar-upload',
  imports: [FastSvgComponent, AvatarCircleComponent],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarUploadComponent {
  protected readonly previewUrl = signal<string | null>(null);

  readonly imageUploaded = output<File>();
  readonly currentAvatar = input.required<string>();

  @HostBinding('class.dragging') isDragging = signal<boolean>(false);

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  @HostListener('dragleave') onDragLeave() {
    this.isDragging.set(true);
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);

    const file = event.dataTransfer?.files[0];
    if (file) this.#processFile(file);
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.#processFile(file);
  }

  #processFile(file: File) {
    if (!file.type.startsWith('image/')) return alert('Можно загружать только изображения!');
    if (file.size > 5 * 1024 * 1024) return alert('Файл слишком большой! Максимум 5MB.');

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl.set(reader.result as string);
      this.imageUploaded.emit(file);
    };
    reader.readAsDataURL(file);
  }
}
