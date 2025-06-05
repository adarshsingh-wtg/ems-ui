import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Department {
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
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.baseUrl);
  }

  addDepartment(dept: Omit<Department, 'id'>): Observable<Department> {
    return this.http.post<Department>(this.baseUrl, dept);
  }

  updateDepartment(dept: Department): Observable<Department> {
    return this.http.put<Department>(`${this.baseUrl}`, dept);
  }
  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
