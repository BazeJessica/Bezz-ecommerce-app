import { Component, Input } from '@angular/core';
import { Housinglocation } from '../housinglocation';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-housing-location',
  imports: [CommonModule],
  template: `
    <section class="listing">
      <img
      class="listing-photo "
      [src]="housingLocation.photo"
      alt="Housing photo of {{housingLocation.name}}"
      crossorigin
      >
      <h2 class="listing-heading ">{{housingLocation.name}}</h2>
      <p class="listing-location">{{housingLocation.city}}, {{ housingLocation.state }}</p>
    </section>
  `,
 styleUrls: ['.//housing-location.component.css']
})
export class HousingLocationComponent {
  @Input() housingLocation!: Housinglocation;

}
