import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ttImageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: string): string | null {
    if (!value) return null
    return `https://icherniakov.ru/yt-course/${value}`;
  }

}
