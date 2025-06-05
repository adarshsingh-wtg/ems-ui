import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Deparment {
  id: number;
  name: string;
  readOnly: boolean;
  mandatory: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl = 'http://localhost:8080/api/departments'; 

  constructor(private http: HttpClient) { }
  getDepartments(): Observable<Deparment[]> {
    return this.http.get<Deparment[]>(this.baseUrl);
  }

  addDepartment(dept: Omit<Deparment, 'id'>): Observable<Deparment> {
    return this.http.post<Deparment>(this.baseUrl, dept);
  }

  updateDepartment(dept: Deparment): Observable<Deparment> {
    return this.http.put<Deparment>(`${this.baseUrl}`, dept);
  }
  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
