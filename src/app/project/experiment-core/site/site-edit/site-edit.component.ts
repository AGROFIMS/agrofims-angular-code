import { Component, OnInit } from '@angular/core';

import { SiteService } from '../service/site.service';
import { Site } from '../model/site';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-edit',
  templateUrl: './site-edit.component.html',
  styleUrls: ['./site-edit.component.css']
})
export class SiteEditComponent implements OnInit {

  site: Site = new Site('', '', '', '', '', '', '', '', '', '', '', '', '', 'on');

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const siteId = this.route.snapshot.paramMap.get('id');
    this.siteService.get(siteId).subscribe((site: Site) => this.site = site);
  }

  onSubmit() {
    this.siteService.put(this.site).subscribe(() => {
      this.router.navigate(['/sites']);
    });
  }

  back() {
    this.router.navigate(['/sites']);
  }

}
