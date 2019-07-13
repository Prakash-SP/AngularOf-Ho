import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @Input() employeeDetails = { Id: '', Name: '', Age: '', Email: '', Post: '' };
  Employee: any = [];
  isEdit = false;

  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadEmployees()
  }

   // Get employees list
   loadEmployees() {
    return this.restApi.getEmployees().subscribe((data: {}) => {
      this.Employee = data;
    });
  }

  // Add employee
  addEmployee(dataEmployee) {
    this.restApi.createEmployee(this.employeeDetails).subscribe((data: {}) => {
      this.reset();
      this.loadEmployees();
    });
  }

  // Delete employee by sending data in body
  deleteEmployee(Id) {
    if (window.confirm('Are you sure, you want to delete?')) {
     this.restApi.deleteEmployee(Id).subscribe(data => {
        this.loadEmployees();
      });
    }
  }

  // Delete employee by sending data in body
  deleteEmplbq(Id) {
    if (window.confirm('Are you sure, you want to delete?')) {
     this.restApi.deleteEmpBQ(Id).subscribe(data => {
        this.loadEmployees();
      });
    }
  }
  
  //Edit employee
  edit(Id,Name,Age,Email,Post){
    this.isEdit = true
    this.employeeDetails = { Id: Id, Name: Name, Age: Age, Email: Email, Post: Post }
  }

  // Update employee
  updateEmployee() {
    if (window.confirm('Are you sure, you want to update?')) {
      this.restApi.updateEmployeee(this.employeeDetails.Id, this.employeeDetails).subscribe(data => {
      this.reset();
      this.loadEmployees();
      });
    }
  }

  reset()
  {
    this.isEdit = false
   this.employeeDetails = { Id: '', Name: '', Age: '', Email: '', Post: '' }
  }

}
