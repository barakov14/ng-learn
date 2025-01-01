import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ttSvgIcon'
})
export class SvgIconPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    return value ? `/assets/icons/${value}.svg` : '/assets/icons/default.svg';
  }

}
