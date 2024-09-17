// time-ago.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment'; // Use default import

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string): string {
    return moment(value).fromNow();
  }
}
