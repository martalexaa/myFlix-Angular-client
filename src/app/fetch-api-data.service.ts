import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://martalexa-myflix.onrender.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  /**
   * Makes an API call to register a new user.
   * @param userDetails - The user details to be sent in the request body.
   * @returns An Observable that emits the response from the API call.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to login a user.
   * @param userDetails - The user details to be sent in the request body.
   * @returns An Observable that emits the response from the API call.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to get all movies.
   * @returns An Observable that emits the response from the API call.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to get a movie by title.
   * @param title - The title of the movie to be retrieved.
   * @returns An Observable that emits the response from the API call.
   */
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to get a director by name.
   * @param directorName - The name of the director to be retrieved.
   * @returns An Observable that emits the response from the API call.
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'directors/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to get a genre by name.
   * @param genreName - The name of the genre to be retrieved.
   * @returns An Observable that emits the response from the API call.
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genres/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to get a user by name.
   * @returns An Observable that emits the response from the API call.
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to get a user' favorite movies.
   * @returns An Observable that emits the response from the API call.
   */
  getFavMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http
      .get(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  /**
   * Add a movie to the user's favorite movies list.
   * @param movieId - ID of the movie to be added
   * @returns Observable<any> - Response data after adding the movie
   */
  addFavMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http
      .post(
        apiUrl + 'users/' + userName + '/movies/' + movieId,
        { FavoriteMovie: movieId },
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete a movie from the user's favorite movies list.
   * @param movieId - ID of the movie to be deleted
   * @returns Observable<any> - Response data after deleting the movie
   */
  deleteFavMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + 'users/' + userName + '/movies/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Edit user information.
   * @param updatedUser - Updated user information
   * @returns Observable<any> - Response data after editing user information
   */
  editUser(updatedUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http
      .put(apiUrl + 'users/' + userName, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete user from the database.
   * @returns Observable<any> - Response data after deleting user
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Non-typed response extraction
   * Extracts the response data from an HTTP response.
   * @param res - HTTP response object
   * @returns The response body or an empty object if response body is null or undefined
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Handles HTTP error responses.
   * @param error - HTTP error response object
   * @returns An error message to be thrown as an observable error
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  /**
   * Checks if the user is logged in and returns true or false.
   * @param token - Token to check for logged-in status
   * @returns The logged-in status as true or false
   */
  private loggedInStatus = false;
  setloggedInStatus(token: any) {
    if (token) {
      this.loggedInStatus = true;
    }
    if (!token) {
      this.loggedInStatus = false;
    }

    return this.loggedInStatus;
  }
}
