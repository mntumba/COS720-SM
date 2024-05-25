import { Routes } from '@angular/router';
import { AuthenticationComponent } from '../components/authentication/authentication.component';
import { HomeComponent } from '../components/home/home.component';

export const routes: Routes = [
    { path: '', component: AuthenticationComponent },
    { path: 'app-home', component: HomeComponent }
];
