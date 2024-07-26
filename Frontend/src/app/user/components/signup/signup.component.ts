import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { User,Role } from '../../../entities/user';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string;
  email: string;
  password: string;
  errorMessage: string;
  confirmPassword: string;
  birthdate:Date;
  @Output() switchToLogin = new EventEmitter<void>();

  constructor(private userService: UserService, private router: Router) { }

  signup(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const user: User = {
      id: 0,
      username: this.username,
      email: this.email,
      password: this.password,
      role: Role.Client,
      enabled: true,
      birthdate: this.birthdate
    };

    console.log(user.birthdate);

    this.userService.signup(user).subscribe({
      next: (response) => {
        console.log('User signed up successfully', response);
        this.switchToLogin.emit(); // navigate to login after successful signup
      },
      error: (err) => {
        console.error('Signup error', err);
        this.errorMessage = 'Signup failed. Please try again.';
      }
    });
  }

}