import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { RespPassword } from '../../models/resp';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<PasswordComponent>,
  ) { }

  response: string;
  colorMessage = 'black';
  notification: string;
  messageShow = false;

  username = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
  }

  reset() {
    this.authService.password(
      {
        username: this.username.value
      }
    )
      .subscribe(
        (_response: RespPassword) => {

          this.notification = _response.msg;
          if (_response.flag) {
            // this.colorMessage = 'green';
            // this.newNotification();
            this.dialogRef.close('notification');
          } else {
            this.colorMessage = 'red';
            this.newNotification();
          }

        }
      );
  }

  register() {
    this.dialogRef.close('register');
  }

  newNotification() {
    this.messageShow = true;
    setTimeout(() => {
      this.messageShow = false;
    }, 5000);
  }

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
    return this.username.hasError('email') ? 'Not a valid email' : '';
  }

}
