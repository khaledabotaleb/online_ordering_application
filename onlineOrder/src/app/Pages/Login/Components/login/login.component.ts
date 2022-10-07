import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../Service/login.service";
import {ILoginRes} from "../../Model/Interface/login-res";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginResponse = {} as ILoginRes

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('Access-Token')) {
      this.router.navigate(['main', 'product']);
    }
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return
    }
    this.loginService.loginOBJ = this.loginForm.value;
    this.loginService.login().subscribe(res => {
      this.loginResponse = res;
    }, error => {
    }, () => {
      this.router.navigate(['main', 'product']);
      localStorage.setItem('Access-Token', this.loginResponse.access);
    })
  }
}
