import { AfterViewInit, Component, OnInit , ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { User,Role } from '../../../entities/user';
import { MatTabGroup } from '@angular/material/tabs';


@Component({
  selector: 'app-homePage',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent {
  
}