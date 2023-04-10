import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(public router: Router) {}
  ngOnInit(): void {}

  // navigates to the movies page
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  // navigates to the user profile
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  // logs out user, clears token and username from local storage
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
