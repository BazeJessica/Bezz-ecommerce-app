import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Housinglocation } from "../housinglocation";
import { HousingService } from "../housing.service";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
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
        <p class="listing-location">
          {{ housingLocation.city }}, {{ housingLocation.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul class="listing-features-list">
          <li>Units available: {{ housingLocation.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation.wifi }}</li>
          <li>
            Does this location have laundry: {{ housingLocation.laundry }}
          </li>
        </ul>
      </section>
      <section class="listing-application">
        <h2 class="section-heading">
          Apply for this housing location and enjoy the benefits of a new home
        </h2>
        <form [formGroup]="applyForm" (ngSubmit)="submitApplication()">
          <label for="firstName">First Name</label>
          <input
            id="firstName"
            formControlName="firstName"
            type="text"
            required
          />
          <label for="lastName">Last Name</label>
          <input
            id="lastName"
            formControlName="lastName"
            type="text"
            required
          />
          <label for="email">Email</label>
          <input id="email" formControlName="email" type="email" required />
          <button class="primary" type="submit">Apply now</button>
        </form>
      </section>
      <div class="back-button-container">
        <a [routerLink]="['/']" class="back-button">Back to Home</a>
      </div>
    </article>
    <p *ngIf="!housingLocation">Loading housing location information...</p>
  `,
  styleUrls: ["./details.component.css"],
})
export class DetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: Housinglocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
  });
  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"]);
    this.housingLocation =
      this.housingService.getHousingLocationById(housingLocationId);

    // If housing location is not found, log an error
    if (!this.housingLocation) {
      console.error(`Housing location with ID ${housingLocationId} not found.`);
    }
  }

  submitApplication() {
    if (this.applyForm.invalid) {
      return;
    } else {
      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? "",
        this.applyForm.value.lastName ?? "",
        this.applyForm.value.email ?? ""
      );
    }
  }
  // Call the submitApplication method from the HousingService
}
