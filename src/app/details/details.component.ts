import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Housinglocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <article *ngIf="housingLocation" class="listing-container">
      <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
        crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation.name }}</h2>
        <p class="listing-location">{{ housingLocation.city }}, {{ housingLocation.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul class="listing-features-list">
          <li>Units available: {{ housingLocation.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation.wifi }}</li>
          <li>Does this location have laundry: {{ housingLocation.laundry }}</li>
        </ul>
      </section>
      <div class="back-button-container">
        <a [routerLink]="['/']" class="back-button">Back to Home</a>
      </div>
    </article>
    <p *ngIf="!housingLocation">Loading housing location information...</p>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: Housinglocation | undefined;
  
  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
    
    // If housing location is not found, log an error
    if (!this.housingLocation) {
      console.error(`Housing location with ID ${housingLocationId} not found.`);
    }
  }
}