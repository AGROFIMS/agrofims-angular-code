import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from '../../auth/services/auth.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
}
