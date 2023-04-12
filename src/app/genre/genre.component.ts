import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * GenreComponent is a dialog component for displaying genre details.
 */
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent {
  /**
   * Constructor for GenreComponent
   * @param data - Data to be injected into the dialog component
   * @property {string} Name - Name of the genre
   * @property {string} Description - Description of the genre
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) {}
}
