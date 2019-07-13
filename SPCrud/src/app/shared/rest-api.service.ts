import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../shared/employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  // Define API
  apiURL = 'http://localhost:1338/Login.svc';

  constructor(private http: HttpClient) { }

   /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

    // HttpClient API get() method => Fetch employees list
    getEmployees(): Observable<Employee> {
      return this.http.get<Employee>(this.apiURL + '/GetAllEmployees' )
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
    }

  // HttpClient API post() method => Create employee
  createEmployee(employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiURL + '/RegEmp', employee, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // HttpClient API put() method => Update employee
  updateEmployeee(Id, employee): Observable<Employee> {
    return this.http.put<Employee>(this.apiURL + '/UpdateEmpData', employee, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // HttpClient API delete() method => Delete employee
   deleteEmployee(Id) {
  //  return this.http.delete<Employee>(this.apiURL + '/DeleteEmpData' + {'Id' : Id}, this.httpOptions)
  //  .pipe(
  //    retry(1),
  //    catchError(this.handleError)
  //  );
    return this.http.request('DELETE', this.apiURL + '/DeleteEmpData', {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      }),
      body: { 'Id': Id }
  })
  .pipe( retry(1), catchError( this.handleError ));
}

// HttpClient API delete() method => Delete employee
deleteEmpBQ(Id) {
   return this.http.delete<Employee>(this.apiURL + '/DeleteEmpData?Id='+Id, this.httpOptions)
   .pipe(
     retry(1),
     catchError(this.handleError)
   );
}

  // Error handling
  handleError(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }
}
