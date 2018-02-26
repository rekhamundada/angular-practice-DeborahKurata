import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() hitCount: number;
  @Input() displayDetail: boolean;

  hitMessage: string;
  listFilter: string;
  @ViewChild('filterElement') filterElementRef: ElementRef;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    if (this.filterElementRef.nativeElement) {
      this.filterElementRef.nativeElement.focus();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = 'Hits:' + this.hitCount;
    }
  }
  
  }

//   // backing variable to retain the value
//  private _listFilter: string;

//   get listFilter(): string {
//     return this._listFilter;
//     // returns the value of backing varaible
//   }
//   set listFilter(value: string){
//     // sets the backing variable using the passed in value
//     // notifies the component when the user changes the value
//     this._listFilter = value;
//     this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
//   }
