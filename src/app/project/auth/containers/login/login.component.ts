import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RespLogin } from '../../models/resp';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private readonly USERNAME_LOGIN = 'USERNAME_LOGIN';
  private readonly PASSWORD_LOGIN = 'PASSWORD_LOGIN';

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  loginForm: FormGroup;
  hide = true;
  checked = false;
  colorMessage: string;
  messageShow: boolean;
  notification: string;

  username = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  remember = true;

  ngOnInit(): void {
    if (this.remember) {
      const obj: { username: string, password: string } = this.getRemember();
      this.username.setValue(obj.username);
      this.password.setValue(obj.password);
    }
  }

  login() {
    const username = this.username.value;
    const password = this.password.value;
    this.cleanRemember();

    if (this.remember) {
      this.setRemember(username, password);
    }

    this.authService.login(
      {
        username: username,
        password: password
      }
    )
      .subscribe(
        (_response: RespLogin) => {
          this.notification = _response.msg;
          if (_response.flag) {
            this.dialogRef.close('notification');
          } else {
            this.colorMessage = 'red';
            this.newMessage();
          }
        });
  }

  private getRemember() {
    return { username: localStorage.getItem(this.USERNAME_LOGIN), password: localStorage.getItem(this.PASSWORD_LOGIN) };
  }
  private setRemember(username: string, password: string) {
    localStorage.setItem(this.USERNAME_LOGIN, username);
    localStorage.setItem(this.PASSWORD_LOGIN, password);
  }
  private cleanRemember() {
    localStorage.removeItem(this.USERNAME_LOGIN);
    localStorage.removeItem(this.PASSWORD_LOGIN);
  }

  forgotPassword() {
    this.dialogRef.close('password');
  }
  register() {
    this.dialogRef.close('register');
  }
  newMessage() {
    this.messageShow = true;
    setTimeout(() => {
      this.messageShow = false;
    }, 5000);
  }
  getErrorMessage() {
    const user_validators = [Validators.required, Validators.email];
    const admin_validators = [Validators.required];

    if (this.username.value === 'admin') {
      this.username.setValidators(null);
    } else {
      this.username.setValidators(user_validators);
    }
    this.username.updateValueAndValidity();

    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
    return this.username.hasError('email') ? 'Not a valid email' : '';
  }
}


