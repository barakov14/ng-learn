import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ttImageUrl',
})
export class ImageUrlPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return 'https://avatar.iran.liara.run/public';
    else if (value.includes('data:image')) return `${value}`;
    return `https://icherniakov.ru/yt-course/${value}`;
  }
}
