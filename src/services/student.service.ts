import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';
import { Observable } from 'rxjs';
import { dev } from '../env';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = dev.apiUrl + '/student';

  constructor(private http: HttpClient) { 
  }

  getSubjectsPerQualification(username: string, sessionToken: string): Observable<Subject[]> {
    return this.http.get<Subject[]>(
      `${this.apiUrl}/getSubjectsPerQualification/${username}`,
      { headers: { sessionToken: sessionToken } }
    );
  }

  getRegisteredSubjects(username: string, sessionToken: string): Observable<Subject[]> {
    return this.http.get<Subject[]>(
      `${this.apiUrl}/getRegisteredSubjects/${username}`,
      { headers: { sessionToken: sessionToken } }
    );
  }

  registerSubjects(subjects: Array<Subject>, sessionToken: string, username: string): Observable<Array<Subject>> {
    return this.http.post<Array<Subject>>(
      `${this.apiUrl}/registerSubjects`,
      subjects,
      { headers: { 
          username: username,
          sessionToken: sessionToken
        } 
      }
    );
  }

  dropSubject(id: number, sessionToken: string): Observable<Subject> {
    return this.http.delete<Subject>(
      `${this.apiUrl}/dropSubject/${id}`,
      { headers: { sessionToken: sessionToken } }
    );
  }
}
