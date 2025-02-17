import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '@tt/chats/data-access';
import { Profile } from '@tt/common/data-access';

@Pipe({
  name: 'ttGroupMessage',
})
export class GroupMessagePipe implements PipeTransform {
  transform(messages: Array<Message & { user: Profile; isMine: boolean }>) {}
}
