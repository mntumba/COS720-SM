import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Qualification } from '../models/qualification';
import { Subject } from '../models/subject';
import { User } from '../models/user';
import { UserResponse } from '../models/user-response';
import { dev } from '../env';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = dev.apiUrl + '/admin';

  constructor(private http: HttpClient) {
  }

  getQualifications(sessionToken: string, username: string): Observable<Qualification[]> {
    return this.http.get<Qualification[]>(
      `${this.apiUrl}/getAllQualifications`,
      { headers: { sessionToken: sessionToken, username: username } }
    );
  }

  addQualification(qualification: Qualification, sessionToken: string, username: string): Observable<Qualification> {
    return this.http.post<Qualification>(
      `${this.apiUrl}/addQualification`,
      qualification,
      { headers: { sessionToken: sessionToken, username: username } }
    );
  }

  deleteQualification(id: number, sessionToken: string, username: string): Observable<Qualification> {
    return this.http.delete<Qualification>(
      `${this.apiUrl}/deleteQualification/${id}`,
      { headers: { sessionToken: sessionToken, username: username } }
    );
  }

  addSubjects(subjects: Array<Subject>, sessionToken: string, username: string): Observable<Array<Subject>> {
    console.log(subjects)
    return this.http.post<Array<Subject>>(
      `${this.apiUrl}/addSubjects`,
      subjects,
      { headers: { sessionToken: sessionToken, username: username } }
    );
  }

  getStudents(sessionToken: string, username: string): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(
      `${this.apiUrl}/getAllStudents`,
      { headers: { sessionToken: sessionToken, username: username } }
    );
  }

  getSubjects(sessionToken: string, username: string): Observable<Subject[]> {
    return this.http.get<Subject[]>(
      `${this.apiUrl}/getAllSubjects`,
      { headers: { sessionToken: sessionToken, username: username } }
    );
  }

  getTeachers(sessionToken: string, username: string): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(
      `${this.apiUrl}/getAllTeachers`,
      { headers: { sessionToken: sessionToken, username: username } }
    );
  }

  addUser(teacher: User, sessionToken: string, username: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      `${this.apiUrl}/addUser`,
      teacher,
      { headers: { sessionToken: sessionToken, username: username } }
    );
  }

  deleteUser(username: string, sessionToken: string, loggedin: string): Observable<UserResponse> {
    return this.http.delete<UserResponse>(
      `${this.apiUrl}/deleteUser/${username}`,
      { headers: { sessionToken: sessionToken, username: loggedin } }
    );
  }

}
