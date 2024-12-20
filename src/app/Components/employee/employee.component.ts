import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../Services/employee.service';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../Services/department.service';
import { Department } from '../../Models/department';
import { RouterModule } from '@angular/router';
import { sortArray } from '../../Utils/sort-utils';
import { filterList } from '../../Utils/filter-utils';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  employeeList: Employee[] = [];
  departmentList: Department[] = [];
  empService = inject(EmployeeService);
  depService = inject(DepartmentService);
  filteredEmployeeList: Employee[] = []; // List to display after filtering
  searchTerm: string = ''; // For storing user input
  employeeForm: FormGroup = new FormGroup({});
  currentPage: number = 1;
  totalPages: number = 0;
  pageSize: number = 5; // Number of items per page
  totalItems: number = 0;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.setFormState();
    this.getEmployees();
    this.getDepartments();
  }
  openModal() {
    const empModal = document.getElementById('myModal');
    if (empModal != null) {
      empModal.style.display = 'block';
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getEmployees();
    }
  }

  onSearch(): void {
    this.filteredEmployeeList = filterList(
      this.employeeList,
      this.searchTerm,
      'empName'
    );
  }

  closeModal() {
    this.setFormState();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }
  getEmployees() {
    debugger;
    this.empService
      .getAllEmployees(this.currentPage, this.pageSize)
      .subscribe((res) => {
        this.filteredEmployeeList = res.data;
        this.filteredEmployeeList.forEach((element) => {
          this.depService.getDepartmentById(element.deptId).subscribe((res) => {
            element.deptName = res.deptName;
          });
        });
        this.employeeList = res.data;
        this.totalItems = res.totalItems;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      });
  }
  getDepartments() {
    this.depService.getAllDepartments().subscribe((res) => {
      this.departmentList = res.data;
    });
  }

  setFormState() {
    this.employeeForm = this.fb.group({
      id: [0],
      empName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      age: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      salary: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      status: [false, [Validators.required]],
      city: [''],
      deptId: ['', [Validators.required]],
    });
  }
  formValues: any;
  onSubmit() {
    if (this.employeeForm.invalid) {
      alert('Please Fill All Fields');
      return;
    }
    if (this.employeeForm.value.id == 0) {
      this.formValues = this.employeeForm.value;
      this.empService.addEmployee(this.formValues).subscribe((res) => {
        alert('Employee Added Successfully');
        this.employeeForm.reset();
        this.closeModal();
        this.getEmployees();
      });
    } else {
      this.formValues = this.employeeForm.value;
      this.empService.updateEmployee(this.formValues).subscribe((res) => {
        alert('Employee Updated Successfully');
        this.employeeForm.reset();
        this.closeModal();
        this.getEmployees();
      });
    }
  }

  sortColumn(column: keyof Employee, order: 'asc' | 'desc'): void {
    this.filteredEmployeeList = sortArray(
      this.filteredEmployeeList,
      column,
      order
    );
  }

  OnEdit(Employee: Employee) {
    this.openModal();
    this.depService.getDepartmentById(Employee.deptId).subscribe((res) => {
      Employee.deptName = res.deptName;
      this.employeeForm.patchValue(Employee);
    });
  }
  onDelete(employee: Employee) {
    const isConfirm = confirm(
      'Are you sure you want to delete this Employee ' + employee.empName
    );
    if (isConfirm) {
      this.empService.deleteEmployee(employee.id).subscribe((res) => {
        alert('Employee Deleted Successfully');
        this.getEmployees();
      });
    }
  }
}
