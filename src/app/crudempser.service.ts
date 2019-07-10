import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudempserService {
  url = 'http://localhost:1338/Login.svc/RegEmp';
  constructor(
    private htc: HttpClient
  ) { }
}
