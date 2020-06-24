import { Component, OnInit } from '@angular/core';
import { Crop } from '../model/crop';
import { CropService } from '../service/crop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crop-list',
  templateUrl: './crop-list.component.html',
  styleUrls: ['./crop-list.component.css']
})
export class CropListComponent implements OnInit {

  cropList: Crop[] = [];

  displayedColumns: string[] = ['cropCommonName', 'fatherCropId', 'isFather', 'locked', 'modifiedAt', 'action'];


  constructor(
    private siteService: CropService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCrops();
  }

  getCrops() {
    return this.siteService
      .getAll()
      .subscribe((_cropList: Crop[]) => {
        this.cropList = _cropList.filter(
          item =>
            item.isFather.toString() === 'on' &&
            item.locked.toString() === 'off'
        );
      });
  }

  addCrop() {
    this.router.navigate(['/crops/add']);
  }

  deleteCrop(crop: Crop) {
    this.siteService
      .delete(crop)
      .subscribe(() => {
        this.getCrops();
      });
  }

  editCrop(id: any) {
    this.router.navigate(['/crops/edit', id]);
  }


}
