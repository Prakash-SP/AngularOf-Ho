import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  Id = ""
  employeeData: any = {};
  Employee: any = [];
  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ){}

  ngOnInit() {
    this.Id = this.actRoute.snapshot.queryParams['Id'];
    this.fetchEmpData();
    this.restApi.getEmployee(this.Id).subscribe((data: {}) => {
    //this.employeeData = data;
    
    });
  }
  // Get employees data
  fetchEmpData() {
    return this.restApi.getEmployee(this.Id).subscribe((data: {}) => {
      this.Employee = data;
      this.Employee.forEach(element => {
        this.employeeData.Id = element.Id
        this.employeeData.Name = element.Name
        this.employeeData.Age = element.Age
        this.employeeData.Email = element.Email
        this.employeeData.Post = element.Post
      });
    });
  }
  // Update employee data
  updateEmployee() {
    if (window.confirm('Are you sure, you want to update?')) {
      this.restApi.updateEmployee(this.Id, this.employeeData).subscribe(data => {
        this.router.navigate(['/employees-list']);
      });
    }
  }
}
