import { Component, OnInit, Input } from '@angular/core';
import { SiteDesign } from '../model/site-design';
import { SiteDesignService } from '../service/site-design.service';

@Component({
  selector: 'app-site-design-edit-vii',
  templateUrl: './site-design-edit-vii.component.html',
  styleUrls: ['./site-design-edit-vii.component.css']
})
export class SiteDesignEditViiComponent implements OnInit {
  @Input() siteDesign: SiteDesign;
  @Input() numberList: string[];

  variableList_plot: string[] = [
    'm', 'ft'
  ];

  constructor(
    private siteDesignService: SiteDesignService,
  ) { }

  ngOnInit(): void {
  }

  put() {
    return this.siteDesignService
      .put(this.siteDesign)
      .subscribe();
  }
}
