import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from 'src/app/services/department.service';
import { Employee, EmployeeService } from 'src/app/services/employee.service';
import { DepartmentService } from 'src/app/services/department.service';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent {
  
  departments: Department[] = [];

  selectedDepartmentsForUpdate: Department[] = [];
  selectedDepartments: Department[] = [];

  employees: Employee[] = [];
  newEmployee = { name: '',  departments: [] as Department[] };
  selectedEmployee: Employee = { id: 0, name: '', departments: [] };

  constructor(private modalService: NgbModal, private employeeService: EmployeeService, private departmentService: DepartmentService) {}

  ngOnInit() {
    this.loadEmployees();
    this.loadDepartments();
  }
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }
  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe((data: Department[]) => {
      this.departments = data;
      this.selectedDepartments = this.departments.filter(d => d.mandatory);
    });
  }
  openCreateModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  addEmployee(modal: any) {
    this.newEmployee.departments = [...this.selectedDepartments];
    this.employeeService.addEmployee(this.newEmployee).subscribe((newEmp: Employee) => {
      this.employees.push(newEmp);
      modal.close();
      this.newEmployee = { name: '', departments: [] };
    });
  }

  openEditModal(modalTemplate: any, emp: Employee) {
    this.selectedEmployee = { ...emp };
    this.selectedDepartmentsForUpdate = this.departments.filter(d => 
      this.selectedEmployee.departments.some(ed => ed.id === d.id)
    );
    this.modalService.open(modalTemplate, { centered: true });
  }
  updateEmployee(modal: any) {
    this.selectedEmployee.departments = [...this.selectedDepartmentsForUpdate];
    this.employeeService.updateEmployee(this.selectedEmployee).subscribe(updatedEmp => {
      const index = this.employees.findIndex(e => e.id === updatedEmp.id);
      if (index !== -1) {
        this.employees[index] = updatedEmp;
      }
      modal.close();
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter(e => e.id !== id);
    });
  }
}
