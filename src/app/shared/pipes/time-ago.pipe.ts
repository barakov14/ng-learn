import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ttTimeAgo',
  pure: false, // Можно сделать true, если не нужен автоапдейт
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | number): string {
    if (!value) return 'Некорректная дата';

    const date = new Date(value);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const isYesterday =
      new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString();
    const isSameYear = date.getFullYear() === new Date().getFullYear();

    if (diffInSeconds < 60) return 'только что';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} мин. назад`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ч. назад`;

    if (isYesterday) return `вчера в ${this.formatTime(date)}`;

    if (isSameYear) return `${this.formatDate(date)} в ${this.formatTime(date)}`;

    return `${this.formatDate(date, true)} в ${this.formatTime(date)}`;
  }

  private formatTime(date: Date): string {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }

  private formatDate(date: Date, withYear: boolean = false): string {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    if (withYear) options.year = 'numeric';
    return date.toLocaleDateString('ru-RU', options);
  }
}
