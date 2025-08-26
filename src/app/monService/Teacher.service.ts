import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 import { Enfant } from '../monClass/enfant';
import { Teacher } from '../monClass/Teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private baseUrl = 'https://childrengard.onrender.com/api/teachers';

  constructor(private http: HttpClient) { }

  // CRUD Teacher
  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.baseUrl}/list`);
  }

  getTeacherById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.baseUrl}/${id}`);
  }

  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.baseUrl}`, teacher);
  }

  updateTeacher(id: number, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.baseUrl}/${id}`, teacher);
  }

  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Enfants assignés à un teacher
  getEnfantsByTeacher(id: number): Observable<Enfant[]> {
    return this.http.get<Enfant[]>(`${this.baseUrl}/${id}/enfants`);
  }
}
