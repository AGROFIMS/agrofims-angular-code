import { Component, OnInit } from '@angular/core';
import { CropService } from '../service/crop.service';
import { Router } from '@angular/router';
import { Crop } from '../model/crop';

@Component({
  selector: 'app-crop-add',
  templateUrl: './crop-add.component.html',
  styleUrls: ['./crop-add.component.css']
})
export class CropAddComponent implements OnInit {

  crop = new Crop(null, null, 'on', 'off', 'on');

  constructor(
    private cropService: CropService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.cropService.post(this.crop).subscribe(() => {
      this.router.navigate(['/crops']);
    });
  }

  back() {
    this.router.navigate(['/crops']);
  }

}
