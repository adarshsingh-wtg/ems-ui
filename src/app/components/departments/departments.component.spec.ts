import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DepartmentsComponent } from './departments.component';
import { DepartmentService, Department } from 'src/app/services/department.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('DepartmentsComponent', () => {
  let component: DepartmentsComponent;
  let fixture: ComponentFixture<DepartmentsComponent>;
  let modalService: NgbModal;
  let departmentService: jasmine.SpyObj<DepartmentService>;
  let mockModalRef: jasmine.SpyObj<NgbModalRef>;

  const mockDepartments: Department[] = [
    { id: 1, name: 'Organisation', readOnly: true, mandatory: true },
    { id: 2, name: 'IT', readOnly: true, mandatory: false },
    { id: 3, name: 'Marketing', readOnly: false, mandatory: false }
  ];

  beforeEach(async () => {
    const departmentServiceSpy = jasmine.createSpyObj('DepartmentService', ['getDepartments', 'addDepartment', 'updateDepartment', 'deleteDepartment']);
    const modalRefSpy = jasmine.createSpyObj('NgbModal', ['open']);
    await TestBed.configureTestingModule({
      declarations: [ DepartmentsComponent ],
      imports: [FormsModule],
      providers: [
        { provide: DepartmentService, useValue: departmentServiceSpy },
        { provide: NgbModal, useValue: { open: () => modalRefSpy} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal);
    departmentService = TestBed.inject(DepartmentService) as jasmine.SpyObj<DepartmentService>;
    mockModalRef = modalRefSpy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load departments on init', () => {
    departmentService.getDepartments.and.returnValue(of(mockDepartments));

    component.ngOnInit();
    
    expect(departmentService.getDepartments).toHaveBeenCalled();
    expect(component.departments).toEqual(mockDepartments);
  });
});
