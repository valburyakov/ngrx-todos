import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { FilterComponent } from './filter.component';
import { queryAllFor, queryFor } from '../../testing/helper';
import { TEST_DATA } from '../../testing/test.data';
import { FilterRecord } from '../../models/filter.model';

describe('Presentation: FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let filterEl: HTMLSelectElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterComponent ],
      imports: [
        ReactiveFormsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    filterEl = queryFor(fixture, 'select').nativeElement;
    component.filters = TEST_DATA.filters as FilterRecord[];
    fixture.detectChanges();
  }));

  it('should init filters', () => {
    const options = queryAllFor(fixture, 'option');
    expect(options.length).toBe(TEST_DATA.filters.length);
  });

  it('should set active filter', async(() => {
    component.active = 'SHOW_ACTIVE';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(filterEl.value).toContain('SHOW_ACTIVE');
      expect(component.filter.value).toEqual('SHOW_ACTIVE');
    })
  }));

  it('should emit changeFilter event', (done) => {
    const selectedFilter = TEST_DATA.filters[1];
    const filterValue = `${TEST_DATA.filters.indexOf(selectedFilter)}: ${selectedFilter.id}`;
    component.changeFilter.subscribe(filter => {
      expect(filter).toEqual(selectedFilter.id);
      done();
    });

    filterEl.value = filterValue;
    filterEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  });

});
