import { Routes } from '@angular/router';
import { EmployeeComponent } from './Components/employee/employee.component';
import { DepartmentComponent } from './Components/department/department.component';

export const routes: Routes = [

    {
        path: "", component: EmployeeComponent
    },
    {
        path: "employee", component: EmployeeComponent
    },
    {
        path:"department",component:DepartmentComponent
    }
   
];
