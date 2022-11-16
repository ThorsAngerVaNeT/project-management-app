import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByOrder',
})
export class SortByOrderPipe implements PipeTransform {
  transform<T extends { order: number }>(value: T[]): T[] {
    return value.sort((a, b) => {
      return a.order - b.order;
    });
  }
}
