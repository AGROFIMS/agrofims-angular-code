import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationComponent } from '../../../project/auth/containers/authentication/authentication.component';
import { LoginComponent } from '../../../project/auth/containers/login/login.component';
import { NotificationComponent } from '../../../project/auth/containers/notification/notification.component';
import { PasswordComponent } from '../../../project/auth/containers/password/password.component';
import { ProfileComponent } from '../../../project/auth/containers/profile/profile.component';
import { RegisterComponent } from '../../../project/auth/containers/register/register.component';
import { RespProfile } from '../../../project/auth/models/resp';
import { AuthService } from '../../../project/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('load', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(600, style({ opacity: 0 }))
      ])
    ])
  ]
})

export class AppHeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  messageShow: boolean;
  message: string;
  initials: string;
  name: string;
  backgroundColor: string;

  ngOnInit(): void {
    const _isLoggedIn = this.isLoggedIn();
    if (_isLoggedIn) {
      this.getProfile();
    } else {
      this.login();
    }
  }

  logout() {
    this.authService.logout().subscribe(success => {
      if (success) {
        this.getProfile();
        this.router.navigate(['/about']);
        this.notification('Logout Success');
        this.login();
      }
    });
  }

  login() {
    const dialogRef = this.dialog.open(LoginComponent, {
      data: { input: null },
      width: '370px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'register') {
        this.register();
      } else if (result === 'password') {
        this.password();
      } else if (result === 'notification') {
        this.notification('Login Success');
        this.getProfile();
      }
    });
  }

  register() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      data: { input: null },
      width: '370px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'login') {
        this.login();
      } else if (result === 'notification') {
        this.popUpMessage('Account created successfully', 'Please check your email to activate your account');
        this.notification('Account created successfully');
      }
    });
  }

  notification(msg: string) {
    this.message = msg;
    this.newMessage();
  }

  popUpMessage(title: string, body: string) {
    const dialogRef = this.dialog.open(NotificationComponent, {
      data: { title: title, body: body },
      width: '370px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.login();
    });
  }

  profiles() {
    const username = this.authService.getUsername();
    const dialogRef = this.dialog.open(ProfileComponent, {
      data: { input: username },
      width: '370px',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  authentication() {
    const username = this.authService.getUsername();
    const dialogRef = this.dialog.open(AuthenticationComponent, {
      data: { input: username },
      width: '370px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'notification') {
        this.notification('Password updated!');
      }
    });
  }

  password() {
    const dialogRef = this.dialog.open(PasswordComponent, {
      data: { input: null },
      width: '370px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'register') {
        this.register();
      } else if (result === 'notification') {
        this.popUpMessage('Password reset successfully', 'Please check your email to recover your password');
        this.notification('Password reset successful');
      }
    });
  }


  getProfile() {
    const username = this.authService.getUsername();
    if (username) {
      this.authService.profile({ username: username })
        .subscribe(
          (_profile: RespProfile) => {
            this.getRandomColor();
            this.name = _profile.firstName + ' ' + _profile.lastName;
            this.initials = _profile.firstName.substr(0, 1).toUpperCase() + _profile.lastName.substr(0, 1).toUpperCase();
          }
        );
    } else {
      this.name = '';
      this.initials = '';
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  newMessage() {
    this.messageShow = true;
    setTimeout(() => {
      this.messageShow = false;
    }, 5000);
  }

  help() {
    window.open('https://agrofims.github.io/helpdocs/', '_blank');
  }

  getRandomColor() {

    const color = Math.floor(Math.random() * (40));

    switch (color) {
      case 0: this.backgroundColor = '#0cbbbb'; break;
      case 1: this.backgroundColor = '#1C2833'; break;
      case 2: this.backgroundColor = '#212F3C'; break;
      case 3: this.backgroundColor = '#515A5A'; break;
      case 4: this.backgroundColor = '#922B21'; break;
      case 5: this.backgroundColor = '#B03A2E'; break;
      case 6: this.backgroundColor = '#76448A'; break;
      case 7: this.backgroundColor = '#6C3483'; break;
      case 8: this.backgroundColor = '#1F618D'; break;
      case 9: this.backgroundColor = '#2874A6'; break;
      case 10: this.backgroundColor = '#148F77'; break;
      case 11: this.backgroundColor = '#117A65'; break;
      case 12: this.backgroundColor = '#B7950B'; break;
      case 13: this.backgroundColor = '#B9770E'; break;
      case 14: this.backgroundColor = '#AF601A'; break;
      case 15: this.backgroundColor = '#A04000'; break;
      case 16: this.backgroundColor = '#717D7E'; break;
      case 17: this.backgroundColor = '#616A6B'; break;
      case 18: this.backgroundColor = '#283747'; break;
      case 19: this.backgroundColor = '#212F3D'; break;
      case 20: this.backgroundColor = '#C0392B'; break;
      case 21: this.backgroundColor = '#E74C3C'; break;
      case 22: this.backgroundColor = '#9B59B6'; break;
      case 23: this.backgroundColor = '#8E44AD'; break;
      case 24: this.backgroundColor = '#2980B9'; break;
      case 25: this.backgroundColor = '#1ABC9C'; break;
      case 26: this.backgroundColor = '#16A085'; break;
      case 27: this.backgroundColor = '#F1C40F'; break;
      case 28: this.backgroundColor = '#F39C12'; break;
      case 29: this.backgroundColor = '#E67E22'; break;
      case 30: this.backgroundColor = '#D35400'; break;
      case 31: this.backgroundColor = '#95A5A6'; break;
      case 32: this.backgroundColor = '#7F8C8D'; break;
      case 33: this.backgroundColor = '#34495E'; break;
      case 34: this.backgroundColor = '#2C3E50'; break;
      case 35: this.backgroundColor = '#800080'; break;
      case 36: this.backgroundColor = '#FF00FF'; break;
      case 37: this.backgroundColor = '#000080'; break;
      case 38: this.backgroundColor = '#0000FF'; break;
      case 39: this.backgroundColor = '#008080'; break;
      default: this.backgroundColor = '#000000'; break;
    }

    return this.backgroundColor;
  }

}
