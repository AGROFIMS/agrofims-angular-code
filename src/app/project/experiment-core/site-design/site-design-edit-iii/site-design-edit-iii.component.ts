import { Component, OnInit, Input } from '@angular/core';
import { SiteDesign } from '../model/site-design';
import { SiteDesignService } from '../service/site-design.service';

@Component({
  selector: 'app-site-design-edit-iii',
  templateUrl: './site-design-edit-iii.component.html',
  styleUrls: ['./site-design-edit-iii.component.css']
})
export class SiteDesignEditIiiComponent implements OnInit {
  @Input() siteDesign: SiteDesign;
  @Input() numberList: string[];

  variableList: string[] = [
    'plot', 'field', 'pot'
  ];

  variableList_plot: string[] = [
    'm', 'ft'
  ];

  variableList_field: string[] = [
    'm', 'km', 'ft', 'mi'
  ];

  variableList_pot: string[] = [
    'cm', 'in'
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
