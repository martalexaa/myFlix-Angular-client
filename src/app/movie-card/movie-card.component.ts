// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DetailsComponent } from '../details/details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Fetch all movies with FetchApiDataService.getAllMovies()
   * @returns movies in an array of objects
   */
  getFavorites(): any {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      return this.favorites;
    });
  }

  /**
   * Check if a movie id is included in the user's favorites
   * @param id
   * @returns a boolean value
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
   * Remove one movie id from the user's favorites with FetchApiDataService.removeFavoriteMovie()
   * @param id
   */
  removeFromFavorites(id: string): void {
    this.fetchApiData.deleteFavMovie(id).subscribe((resp: any) => {
      this.snackbar.open('The movie was removed from favorites.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '600px',
    });
  }

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