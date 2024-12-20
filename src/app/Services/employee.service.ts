import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7129/api/Employee'
  constructor() { }

  http = inject(HttpClient)

  getAllEmployees(page: number, size: number): Observable<{ data: Employee[]; totalItems: number }> {
    return this.http.get<{ data: Employee[]; totalItems: number }>(`${this.apiUrl}/Get?page=${page}&size=${size}`);
  }

  addEmployee(data: any) {
    return this.http.post<Employee[]>(this.apiUrl+ "/Create", data);
  }
  updateEmployee(employee: Employee) {
    return this.http.put<Employee[]>(`${this.apiUrl}/${employee.id}`, employee)
  }
  deleteEmployee(id: number) {
    return this.http.delete<Employee[]>(`${this.apiUrl}/${id}`);
  }


}
