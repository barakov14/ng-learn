import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ttDateSeparator',
})
export class DateSeparatorPipe implements PipeTransform {
  transform(value: Date | string): string {
    if (!value) return '';

    const date = new Date(value);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2);

    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    twoDaysAgo.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) {
      return 'Сегодня';
    } else if (date.getTime() === yesterday.getTime()) {
      return 'Вчера';
    } else if (date.getTime() === twoDaysAgo.getTime()) {
      return 'Два дня назад';
    } else {
      return date.toLocaleDateString('ru-RU');
    }
  }
}
