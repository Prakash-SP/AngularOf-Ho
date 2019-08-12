import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  @Input() employeeDetails = { Id: '', Name: '', Dob:'', Age:null, Gender:'', Email: '', MobileNo:null, Post: '', Image:'', ImageName:'' };

  bday:any=null;
  age:number=null;
  Gender=['Male','Female','Others'];
  files:any=[];
  fileString:any='';
  fileName:any='';
  constructor(
    public restApi: RestApiService,
    public router: Router,
    public sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
  }

  // addEmployee(dataEmployee) {
  //   this.restApi.createEmployee(this.employeeDetails).subscribe((data: {}) => {
  //     this.router.navigate(['/employees-list']);
  //   });
  // }

  addEmployee() {
    delete this.employeeDetails.Age;
    this.employeeDetails.Image=this.fileString;
    this.employeeDetails.ImageName=this.fileName;
    this.restApi.createEmployee(this.employeeDetails).subscribe((data: {}) => {
    this.router.navigate(['/employees-list']);
    });
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
    this.employeeDetails.Age =getage;
    return this.age;
  }
  getFiles(event) {
    this.files = event.target.files;
    var reader = new FileReader();
    let file = event.target.files[0];
    this.fileName = file.name;
    //console.log(this.fileName)
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

}
