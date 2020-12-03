import { Component, OnInit } from '@angular/core';
import { CropService } from '../service/crop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Crop } from '../model/crop';

@Component({
  selector: 'app-crop-edit',
  templateUrl: './crop-edit.component.html',
  styleUrls: ['./crop-edit.component.css']
})
export class CropEditComponent implements OnInit {

  crop: Crop = new Crop('', '', '', '', '', 'on');

  constructor(
    private cropService: CropService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const cropId = this.route.snapshot.paramMap.get('id');
    this.cropService.get(cropId).subscribe((_crop: Crop) => this.crop = _crop);
  }

  onSubmit() {
    this.cropService.put(this.crop).subscribe(() => {
      this.router.navigate(['/crops']);
    });
  }

  back() {
    this.router.navigate(['/crops']);
  }

}
