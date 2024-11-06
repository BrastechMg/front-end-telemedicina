import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems!: number;
  @Input() itemsPerPage!: number;
  @Input() currentPage!: number;
  @Output() pageChanged = new EventEmitter<number>();
  
  pages: number[] = [];
  totalPages: number = 0;

  ngOnChanges() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  selectPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
  }
}
