import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: 'star.component.html',
  styleUrls: ['star.component.css']
})

export class StarComponent implements OnChanges {
  @Input() rating: number;
  starWidth: number;
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string> ();
  constructor() { }

  onClick() {
    this.ratingClicked.emit(`The rating ${this.rating} clicked`);
  }
  ngOnChanges() {
    this.starWidth = this.rating * 86/5 ;

   }
}
