import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog.component';
import { Role } from '../../../entities/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor( 
    private router: Router,
    private userService:UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  login() {
    this.userService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('User logged in successfully:', response.role);
        if(response.role.toString()=='Admin')
          this.router.navigate(['/admin']);
        else
          this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = 'Invalid email or password';
        console.error('Login error:', error);
      }
    );
  }

  forgotPassword() {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.forgotPassword(this.email).subscribe(
          (response: string) => {
            console.log('Password reset email sent successfully:', response);
            this.snackBar.open('New password sent to your email.', 'Close', {
              duration: 3000,
            });
          },
          (error) => {
            this.errorMessage = 'Error sending password reset email';
            console.error('Forgot password error:', error);
            this.snackBar.open('Error sending password reset email', 'Close', {
              duration: 3000,
            });
          }
        );
      }
    });
  }
}