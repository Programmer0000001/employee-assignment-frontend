// Hold response of rest api
//Properties should match JPA entity created in backend
export class EmployeeRequest {
  firstName: string = '';
  lastName: string = '';
  buCode: string = '';
  buName: string = '';
  regionCode: string = '';
  regionName: string = '';
}
