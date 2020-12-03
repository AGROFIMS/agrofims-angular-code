import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RespAuthentication } from '../../models/resp';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<AuthenticationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  private readonly USERNAME_LOGIN = 'USERNAME_LOGIN';
  private readonly PASSWORD_LOGIN = 'PASSWORD_LOGIN';

  hide1 = true;
  hide2 = true;
  hide3 = true;

  colorMessage: string;
  messageShow: boolean;
  notification: string;

  oldPassword = new FormControl('', [Validators.required]);
  newPassword = new FormControl('', [Validators.required]);
  newPasswordConfirm = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    // const info = localStorage.getItem(this.USERNAME_LOGIN);

    // console.log(
    //   info
    // );

  }

  authentication() {
    const _username = this.data.input;
    const _oldPassword = this.oldPassword.value;
    const _newPassword = this.newPassword.value;
    const _newPasswordConfirm = this.newPasswordConfirm.value;
    if (_newPassword === _newPasswordConfirm) {

      if (_newPassword.length >= 8 && _newPassword.length <= 12) {
        this.authService.authentication(
          {
            username: _username,
            oldPassword: _oldPassword,
            newPassword: _newPassword
          }
        ).subscribe(
          (_response: RespAuthentication) => {

            this.updateRemember(_newPassword);

            this.notification = _response.msg;
            if (_response.flag) {
              // this.colorMessage = 'green';
              // this.newMessage();
              this.dialogRef.close('notification');
            } else {
              this.colorMessage = 'red';
              this.newMessage();
            }
          });
      } else {
        this.notification = 'Enter at least 8 and at most 12 characters';
        this.colorMessage = 'red';
        this.newMessage();
      }
    } else {
      this.notification = 'The passwords are different';
      this.colorMessage = 'red';
      this.newMessage();
    }
  }


  private updateRemember(newPassword: string) {
    localStorage.removeItem(this.PASSWORD_LOGIN);
    localStorage.setItem(this.PASSWORD_LOGIN, newPassword);
  }

  newMessage() {
    this.messageShow = true;
    setTimeout(() => {
      this.messageShow = false;
    }, 5000);
  }

}
