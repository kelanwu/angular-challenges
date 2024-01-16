import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="img"></ng-content>

      <section>
        @for (item of list; track $index) {
          <ng-container
            *ngTemplateOutlet="
              listItemTemplate;
              context: { $implicit: item }
            "></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Input() customClass = '';
  @Output() addNewItem = new EventEmitter<void>();

  @ContentChild('listItem') listItemTemplate!: TemplateRef<{ $implicit: T }>;

  constructor() {}
}
