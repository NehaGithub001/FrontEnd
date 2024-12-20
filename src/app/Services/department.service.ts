import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Department } from '../Models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'https://localhost:7129/api/Department'
  constructor() { }

  http = inject(HttpClient)

  getAllDepartments(){
    return this.http.get<{ data: Department[];}>(`${this.apiUrl}/Get`);
  }

 
  getDepartmentById(id: number) {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }


}