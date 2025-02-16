import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../models/message';
import { Profile } from '../../../shared/models/profile.interface';

@Pipe({
  name: 'ttGroupMessage',
})
export class GroupMessagePipe implements PipeTransform {
  transform(messages: Array<Message & { user: Profile; isMine: boolean }>) {
    if (!messages?.length) return [];

    const grouped: { date: Date; messages: Array<Message & { user: Profile; isMine: boolean }> }[] =
      [];
    const map = new Map<string, Array<Message & { user: Profile; isMine: boolean }>>();

    messages.forEach((message) => {
      const dateKey = new Date(message.createdAt).toLocaleDateString('ru-RU');

      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)?.push(message);
    });

    map.forEach((messages, dateKey) => {
      grouped.push({ date: new Date(dateKey.split('.').reverse().join('-')), messages });
    });

    return grouped;
  }
}
