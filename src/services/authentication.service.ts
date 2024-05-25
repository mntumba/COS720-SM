import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { dev } from '../env';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = dev.apiUrl;

  // currentUser: any;

  constructor(private http: HttpClient, private encryption: EncryptionService) { 
    // let user = localStorage.getItem('currentUser') as string;
    // this.currentUser = this.encryption.decrypt(ocalStorage.getItem('currentUser'));
  }

   authenticate(username: string, password: string) : Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/authenticate`, { username, password});
   }
}
