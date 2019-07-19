import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @Input() employeeDetails = { Id: '', Name: '',Dob:'',Age:null, Gender:'', Email: '', Post: '' };
  Employee: any = [];
  isEdit = false;
  bday:any=null;
  age:number=null;
  Gender=['Male','Female','Others']
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
      console.log(data)
      this.Employee = data;
    });
  }

  // Add employee
  addEmployee() {
    delete this.employeeDetails.Age;
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
  edit(Id,Name,Dob,Gender,Email,Post){
    let getage=this.calcAge(Dob)
    this.isEdit = true
    this.employeeDetails = { Id: Id, Name: Name,Dob:Dob,Age:getage, Gender:Gender, Email: Email, Post: Post }
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

  calcAge(birthdate){
      const bdate = new Date(birthdate);
      const timeDiff = Math.abs(Date.now() - bdate.getTime() );
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365)
      return this.age;
  }

  onDateSelect(event:Event){
    this.bday=(<HTMLInputElement>event.target).value;
    let getage=this.calcAge(this.bday)
    this.employeeDetails.Age =getage;
    return this.age;
  }

  reset()
  {
    this.isEdit = false
   this.employeeDetails = {Id: '', Name: '',Dob:'',Age:null, Gender:'', Email: '', Post: ''}
  }

}
