import { Component, OnInit, Input } from '@angular/core';
import { CropPhenology } from '../model/crop-phenology';
import { CropPhenologyService } from '../service/crop-phenology.service';
import { CropPhenologyListComponent } from '../crop-phenology-list/crop-phenology-list.component';

@Component({
  selector: 'app-crop-phenology-edit',
  templateUrl: './crop-phenology-edit.component.html',
  styleUrls: ['./crop-phenology-edit.component.css']
})
export class CropPhenologyEditComponent implements OnInit {
  @Input() id: any;
  @Input() index: any;
  @Input() studyVariableId: any;

  cropPhenology: CropPhenology = new CropPhenology(
    null, null, null, null, null, null, 'on');

  constructor(
    private cropPhenologyService: CropPhenologyService,
    private compCropPhenologyList: CropPhenologyListComponent,
  ) { }

  ngOnInit(): void {
    this.get(this.id);
  }

  get(id: string) {
    return this.cropPhenologyService
      .get(id)
      .subscribe(
        (_cropPhenology: CropPhenology) => {
          this.cropPhenology = _cropPhenology;
        });
  }

  remove(cropPhenology: CropPhenology): void {
    this.cropPhenologyService
      .delete(cropPhenology.cropPhenologyId)
      .subscribe(() => {
        this.compCropPhenologyList.remove(this.index);
      });
  }
}

