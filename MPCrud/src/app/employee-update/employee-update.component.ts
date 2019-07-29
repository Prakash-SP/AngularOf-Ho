import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  Id = ""
  employeeData: any = {};
  Employee: any = [];
  bday:any=null;
  age:number=null;
  files:any=[];
  fileString:any='';
  imageName = ''
  fileName:any='';
  Gender=['Male','Female','Others']
  constructor(
    public sanitizer:DomSanitizer,
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
    // return this.restApi.getEmployee(this.Id).subscribe((data: {}) => {
      return this.restApi.getEmployee(this.Id).subscribe((data) => {
      this.Employee = data;
      this.Employee.forEach(element => {
        this.employeeData.Id = element.Id
        this.employeeData.Name = element.Name
        this.employeeData.Dob = element.Dob
        let getage=this.calcAge(element.Dob)
        this.employeeData.Age = getage
        this.employeeData.Gender = element.Gender
        this.employeeData.Email = element.Email
        this.employeeData.Post = element.Post
        this.fileString = element.Image
        this.imageName = element.ImageName
        
      });
    });
  }

  // Update employee data
  updateEmployee() {
    delete this.employeeData.Age;
    this.employeeData.Image=this.fileString;
    this.employeeData.ImageName=this.fileName;
    if (window.confirm('Are you sure, you want to update?')) {
      this.restApi.updateEmployee(this.Id, this.employeeData).subscribe(data => {
        this.router.navigate(['/employees-list']);
      });
    }
  }

  // calcAge(birthdate){
  //   const bdate = new Date(birthdate);
  //   const timeDiff = Math.abs(Date.now() - bdate.getTime() );
  //   this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365)
  //   return this.age;
  // }

  calcAge(birthdate) {
    let today = new Date();
    let birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  onDateSelect(event:Event){
    this.bday=(<HTMLInputElement>event.target).value;
    let getage=this.calcAge(this.bday)
    this.employeeData.Age =getage;
    return this.age;
  }

  getFiles(event) {
    this.files = event.target.files;
    var reader = new FileReader();
    let file = event.target.files[0];
    this.fileName = file.name;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.files[0]);
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.fileString = btoa(binaryString);  // Converting binary string data.
    // this.transform(this.filestring);
  }

  // transform(imgvar){
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(imgvar);
  // }

  // cancelPage(){
  //   this.reset()
  //   this.router.navigate(['/employees-list']);
  // }
  // reset()
  // {
  //  this.employeeData = {Id: '', Name: '',Dob:'',Age:null, Gender:'', Email: '', Post: '',Image:'',ImageName:''}
  // }
}
