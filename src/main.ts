/**
 * Entry point of the Angular application.
 * @module
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

/**
 * Bootstrap the AppModule to start the Angular application.
 * @function
 * @public
 * @returns {void}
 */
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
