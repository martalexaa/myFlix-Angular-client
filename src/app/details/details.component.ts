import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * DetailsComponent is a dialog component for displaying movie details.
 */
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  /**
   * Constructor for GenreComponent
   * @param data - Data to be injected into the dialog component
   * @property {string} Title - Movie title
   * @property {string} Description - Description of the movie
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
    }
  ) {}
}
