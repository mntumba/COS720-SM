import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';
import { dev } from '../env';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = dev.apiUrl + '/teacher';

  constructor(private http: HttpClient) {
  }

  getAssignedSubjects(username: string, sessionToken: string): Observable<Subject[]> {
    return this.http.get<Subject[]>(
      `${this.apiUrl}/getAssignedSubjects/${username}`,
      { headers: { sessionToken: sessionToken, userName: username } }
    );
  }

  publishAssignmentMarks(grades: Array<any>, sessionToken: string): Observable<Array<any>> {
    return this.http.post<Array<any>>(
      `${this.apiUrl}/publishAssignmentMarks`,
      grades,
      { headers: { sessionToken: sessionToken } }
    );
  }
}
