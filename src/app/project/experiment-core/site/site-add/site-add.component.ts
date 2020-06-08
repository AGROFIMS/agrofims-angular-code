import { Component, OnInit } from '@angular/core';

import { SiteService } from '../service/site.service';
import { Site } from '../model/site';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-add',
  templateUrl: './site-add.component.html',
  styleUrls: ['./site-add.component.css']
})
export class SiteAddComponent implements OnInit {

  random: string = Math.random().toString(36).substring(7).toUpperCase();
  site = new Site(this.random, null, null, null, 'test', 'test', null, null, null, null, null, null, null, 'on');

  constructor(
    private siteService: SiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.siteService.post(this.site).subscribe(() => {
      this.router.navigate(['/sites']);
    });
  }

  back() {
    this.router.navigate(['/sites']);
  }

}
