// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Use this import to close the dialog on success
import { FetchApiDataService } from '../fetch-api-data.service'; // This import brings in the API calls
import { MatSnackBar } from '@angular/material/snack-bar'; // This import is used to display notifications back to the user

/**
 * Component representing the user registration form which is responsible for handling user registration.
 * @class
 * @implements {OnInit}
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that is called after the component has been initialized.
   * It is used to perform component initialization logic.
   * @method
   * @public
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * This is the function responsible for sending the form inputs to the backend
   * @method
   * @public
   * @returns {void}
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      () => {
        this.dialogRef.close(); // This will close the modal on success!
        let welcomeString =
          'Welcome aboard, ' +
          this.userData.Username +
          '! You may now login with your credentials.';
        this.snackBar.open(welcomeString, 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
