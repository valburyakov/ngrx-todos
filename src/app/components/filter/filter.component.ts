import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'filters',
  template: `
    <select [formControl]="filter" (change)="changeFilter.next(filter.value)">
      <option *ngFor="let filter of filters" [ngValue]="filter.id">{{filter.title}}</option>
    </select>
  `
})
export class FilterComponent {
  @Input() filters;
  @Output() changeFilter = new EventEmitter<any>();
  filter : FormControl;

  constructor() {
    this.filter = new FormControl();
  }

  @Input() set active( val ) {
    this.filter.setValue(val);
  }

}

