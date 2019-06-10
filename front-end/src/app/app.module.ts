import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TvshowsComponent } from './components/tvshows/tvshows.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/log/login/login.component';
import { SignupComponent } from './components/log/signup/signup.component';

//Servicios
import { MoviesService } from './services/movies.service';

//Rutas
import { APP_ROUTING } from './app.routes';

//PiPES
import { UrlInvalidPipe } from './pipes/urlinvalid.pipe';
import { MoviePageComponent } from './components/movie-page/movie-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MoviesComponent,
    TvshowsComponent,
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    UrlInvalidPipe,
    MoviePageComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    MoviesService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
