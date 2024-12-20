import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Department } from '../../Models/department';
import { DepartmentService } from '../../Services/department.service';
import { RouterModule } from '@angular/router';
import { sortArray } from '../../Utils/sort-utils';
import { filterList } from '../../Utils/filter-utils';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
departmentist: Department[] = [];
  deptService = inject(DepartmentService);
  filteredDepartmentList: Department[] = []; // List to display after filtering
  searchTerm: string = ''; // For storing user input

  ngOnInit(): void {

    this.getDepartment();
  }

  onSearch(): void {
    this.filteredDepartmentList = filterList(this.departmentist, this.searchTerm, 'deptName');
  }

  

    getDepartment() {
      this.deptService.getAllDepartments().subscribe((res) => {
        this.filteredDepartmentList = res.data; 
        this.departmentist = res.data;
      })
    }

      

      sortColumn(column: keyof Department, order: 'asc' | 'desc'): void {
        this.filteredDepartmentList = sortArray(this.filteredDepartmentList, column, order);
      }
}
