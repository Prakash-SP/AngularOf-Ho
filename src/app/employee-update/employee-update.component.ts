import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  Id = this.actRoute.snapshot.params['Id'];
  employeeData: any = {};

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.restApi.getEmployee(this.Id).subscribe((data: {}) => {
    this.employeeData = data;
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
