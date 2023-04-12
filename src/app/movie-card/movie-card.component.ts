// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DetailsComponent } from '../details/details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component representing a movie card.
 * @class
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * Fetches all movies using FetchApiDataService.getAllMovies().
   * @method
   * @private
   * @returns {any[]} An array of movie objects
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Fetches the user's favorite movies using FetchApiDataService.getUser().
   * @method
   * @private
   * @returns {any[]} An array of favorite movie objects
   */
  getFavorites(): any {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      return this.favorites;
    });
  }

  /**
   * Checks if a movie ID is included in the user's favorites.
   * @method
   * @public
   * @param {string} id - The movie ID
   * @returns {boolean} A boolean value indicating if the movie is a favorite or not
   */
  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  /**
   * Add one movie id into the user's favorites with FetchApiDataService.addFavoriteMovie()
   * @param id
   */
  addToFavorites(id: string): void {
    this.fetchApiData.addFavMovie(id).subscribe((resp: any) => {
      this.snackbar.open('The movie was added to favorites.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Removes a movie ID from the user's favorites using FetchApiDataService.removeFavoriteMovie().
   * @method
   * @public
   * @param {string} id - The movie ID
   * @returns {void}
   */
  removeFromFavorites(id: string): void {
    this.fetchApiData.deleteFavMovie(id).subscribe((resp: any) => {
      this.snackbar.open('The movie was removed from favorites.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Opens a dialog for displaying genre details.
   * @method
   * @public
   * @param {string} name - The genre name
   * @param {string} description - The genre description
   * @returns {void}
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '600px',
    });
  }

  /**
   * Opens a dialog for displaying director details.
   * @method
   * @public
   * @param {string} name - The director's name
   * @param {string} bio - The director's bio
   * @param {string} birthday - The director's birth year
   * @returns {void}
   */
  openDirector(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
      },
      width: '600px',
    });
  }

  /**
   * Opens a dialog for displaying movie details.
   * @method
   * @public
   * @param {string} title - The movie title
   * @param {string} description - The movie description
   * @returns {void}
   */
  openDetails(title: string, description: string): void {
    this.dialog.open(DetailsComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '600px',
    });
  }
}
