import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Deparment, DepartmentService} from 'src/app/services/department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent {
  departments: Deparment[] =[];

  selectedDepartment: Deparment = { id: 0, name: '', readOnly: false, mandatory: false };

  newDepartment = { name: '', readOnly: false, mandatory: false };

  constructor(private modalService: NgbModal, private departmentService: DepartmentService) {}

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe((data: Deparment[]) => {
      this.departments = data;
    });
  }

  openCreateModal(content: any) {
    this.newDepartment = { name: '', readOnly: false, mandatory: false };
    this.modalService.open(content, { centered: true });
  }

  saveCreateModal(modal: any) {
    this.departmentService.addDepartment(this.newDepartment).subscribe((newDept: Deparment) => {
      this.departments.push(newDept);
      modal.close();
    });
  }


  editDepartment(id: number) {
    const department = this.departments.find(d => d.id === id);
    if (department) {
      department.readOnly = !department.readOnly;
    }
  }

  openEditModal(modalTemplate: any, dept: any) {
    this.selectedDepartment = { ...dept };
    this.modalService.open(modalTemplate, { centered: true });
  }

  saveDepartment(modal: any) {
    this.departmentService.updateDepartment(this.selectedDepartment).subscribe(updatedDept => {
      const index = this.departments.findIndex(d => d.id === updatedDept.id);
      if (index !== -1) {
        this.departments[index] = updatedDept;
      }
      modal.close();
    });
  }

  deleteDepartment(id: number) {
    this.departmentService.deleteDepartment(id).subscribe(() => {
      this.departments = this.departments.filter(d => d.id !== id);
    });
  }
}
