import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { ColumnComponent } from './column/column.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ContentChildren(ColumnComponent) columnsConfig: QueryList<ColumnComponent> =
    new QueryList<ColumnComponent>();

  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();

  @Input() data!: any[];

  ngOnInit(): void {}

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }
}
