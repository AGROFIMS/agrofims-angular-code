import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {

  @Input() ivan: any;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.ivan);
  }

  saveSession() {
    // this.experimentService.put(this.experiment).subscribe();
    // console.log(this.ivan);
    // console.log('ivannnn');
  }

}
