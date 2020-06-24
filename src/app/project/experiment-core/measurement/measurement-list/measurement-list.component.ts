import { Component, OnInit, Input } from '@angular/core';
import { MeasurementService } from '../service/measurement.service';
import { Measurement } from '../model/measurement';
import { SiteCropService } from '../../site-crop/service/site-crop.service';
import { SiteCrop } from '../../site-crop/model/site-crop';
import { empty } from 'rxjs';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.css']
})
export class MeasurementListComponent implements OnInit {
  @Input() childMessage: SiteCrop[];

  itemList: SiteCrop[] = [];

  constructor(
    private measurementService: MeasurementService,
    private siteCropService: SiteCropService,
  ) { }

  ngOnInit(): void {
  }



}
