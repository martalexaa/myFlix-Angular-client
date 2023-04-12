import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Component representing the navigation bar.
 * @class
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(public router: Router) {}

  /**
   * Lifecycle hook that is called after the component has been initialized.
   * @method
   * @public
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * Navigates to the movies page.
   * @method
   * @public
   * @returns {void}
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to the user profile page.
   * @method
   * @public
   * @returns {void}
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs out the user by navigating to the welcome page and clearing the token and username from local storage.
   * @method
   * @public
   * @returns {void}
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
