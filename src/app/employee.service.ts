import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Employee} from "./employee";
import {EmployeeRequestList} from "./employee-request-list";
import {EmployeeRequest} from "./employee-request";
import {EmployeeUpdateRequests} from "./employee-update-request";

//This class can be injected into various components
//This service will be injected in multiple components
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // Base url of backend app
  private baseUrl = "http://localhost:8050/employeemanagement/employee";

  constructor(private httpClient: HttpClient) {
  }

  //Get method return Observable object
  getEmployeesList(): Observable<Employee[]> {
    let observable = this.httpClient.get<Employee[]>(`${this.baseUrl}` + "/all");
    console.log(observable);
    return observable;
  }

  //Make post call to the url
  //Method to create an employee
  createEmployee(employee: Employee): Observable<Object> {
    const employeeRequest: EmployeeRequest = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      buCode: employee.buCode,
      buName: employee.buName,
      regionCode: employee.regionCode,
      regionName: employee.regionName
    };

    const employeeRequestList: EmployeeRequestList = {
      employeeRequestList: [employeeRequest]
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return this.httpClient.post(`${this.baseUrl}`, JSON.stringify(employeeRequestList), {headers: headers}).pipe(
      catchError((error) => {
        const errorMessage = error.error.errorMessage;

        // Display the error message in an alert box
        alert(errorMessage);

        // Rethrow the error to propagate it to the component
        return throwError(error);
      })
    );
  }

  //Method to get an employee by id
  getEmployeeById(id: number): Observable<Employee> {
    const params = new HttpParams().set('id', id.toString());
    return this.httpClient.get<Employee>(this.baseUrl, {params}).pipe(
      catchError((error) => {
        const errorMessage = error.error.errorMessage;

        // Display the error message in an alert box
        alert(errorMessage);

        // Rethrow the error to propagate it to the component
        return throwError(error);
      })
    );
  }

  //Method to update an employee
  updateEmployee(id: number, employee: Employee): Observable<Object> {

    const employeeUpdateList: EmployeeUpdateRequests = {
      employeeUpdateRequests: [employee]
    };

    return this.httpClient.put(`${this.baseUrl}`, employeeUpdateList).pipe(
      catchError((error) => {
        const errorMessage = error.error.errorMessage;

        // Display the error message in an alert box
        alert(errorMessage);

        // Rethrow the error to propagate it to the component
        return throwError(error);
      })
    );
  }

//Method to delete an employee
  deleteEmployee(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}?ids=${id}`).pipe(
      catchError((error) => {
        const errorMessage = error.error.errorMessage;

        // Display the error message in an alert box
        alert(errorMessage);

        // Rethrow the error to propagate it to the component
        return throwError(error);
      })
    );
  }
}
