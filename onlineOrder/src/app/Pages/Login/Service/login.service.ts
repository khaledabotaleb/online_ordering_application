import {Injectable} from '@angular/core';
import {DataService} from "../../../Core/Services/Data/data.service";
import {ILogin} from "../Model/Interface/login";
import {Observable} from "rxjs";
import {API_NAME} from "../../../Core/Models/Static/API_NAME";
import {ILoginRes} from "../Model/Interface/login-res";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginOBJ = {} as ILogin;

  constructor(private dataService: DataService) {
  }

  login(): Observable<ILoginRes> {
    return this.dataService.post(API_NAME.login, this.loginOBJ)
  }
}
