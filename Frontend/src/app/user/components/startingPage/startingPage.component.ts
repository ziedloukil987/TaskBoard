import { AfterViewInit, Component, OnInit , ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { User,Role } from '../../../entities/user';
import { MatTabGroup } from '@angular/material/tabs';


@Component({
  selector: 'app-startingPage',
  templateUrl: './startingPage.component.html',
  styleUrls: ['./startingPage.component.css']
})
export class StartingPageComponent implements AfterViewInit {
  
  @ViewChild('authTabGroup') authTabGroup: MatTabGroup;

  ngAfterViewInit(): void {
    console.log('Auth Tab Group:', this.authTabGroup);
  } 

  switchToLoginTab(): void {
    if (this.authTabGroup) {
      this.authTabGroup.selectedIndex = 0;
    } else {
      console.error('Auth Tab Group is not available');
    }
  }
}