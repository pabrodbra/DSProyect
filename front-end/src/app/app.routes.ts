import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/log/login/login.component';
import { SignupComponent } from './components/log/signup/signup.component';
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { ActorsComponent } from './components/actors/actors.component';

const app_routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'movie/:id', component: MoviePageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'actors', component: ActorsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'movies' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
