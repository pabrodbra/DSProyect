import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TvshowsComponent } from './components/tvshows/tvshows.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/log/login/login.component';
import { SignupComponent } from './components/log/signup/signup.component';
import { MoviePageComponent } from './components/movie-page/movie-page.component';

const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movie/:id', component: MoviePageComponent },
  { path: 'tvshows', component: TvshowsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
