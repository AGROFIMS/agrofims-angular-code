import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCheckboxModule, MatDialogModule,
  MatFormFieldModule, MatIconModule, MatInputModule,
  MatPaginatorModule, MatSortModule, MatTableModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RandomGuard } from './guards/random.guard';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './token.interceptor';
import { RegisterComponent } from './containers/register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from '../../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ProfileComponent } from './containers/profile/profile.component';
import { AuthenticationComponent } from './containers/authentication/authentication.component';
import { PasswordComponent } from './containers/password/password.component';
import { NotificationComponent } from './containers/notification/notification.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AuthenticationComponent,
    PasswordComponent,
    NotificationComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    RandomGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LeafletModule,
  ]
})
export class AuthModule { }
