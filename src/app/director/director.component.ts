import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * DirectorComponent is a dialog component for displaying director details.
 */
@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent {
  /**
   * Constructor for GenreComponent
   * @param data - Data to be injected into the director component
   * @property {string} Name - Name of the director
   * @property {string} Bio - Director's bio
   * @property {string} Birthday - Director's birth year
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birthday: string;
    }
  ) {}
}
