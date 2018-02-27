import { Injectable } from '@angular/core';

@Injectable()
export class ProductParameterService {
  // this is property bag serrvice will hold properties we need to track
  showImage: boolean;
  filterBy: string;

  constructor() { }

}
