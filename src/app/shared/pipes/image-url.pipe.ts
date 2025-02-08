import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ttImageUrl',
})
export class ImageUrlPipe implements PipeTransform {
  transform(value: string): string {
    if (value.includes('data:image')) return `${value}`;
    return `https://icherniakov.ru/yt-course/${value}`;
  }
}
