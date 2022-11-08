import { Injectable } from '@angular/core';
import { AuthService } from '../../project/auth/services/auth.service';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'experiments', name: 'Experiments', type: 'link', icon: 'book' },
  { state: 'sites', name: 'Sites', type: 'link', icon: 'place' },
  // { state: 'surveys', name: 'Surveys', type: 'link', icon: 'list' },
  { state: 'analysis', name: 'Statistical analysis', type: 'link', icon: 'bar_chart' },
  { state: 'documentation', name: 'Documentation', type: 'link', icon: 'receipt' },
  { state: 'about', name: 'About', type: 'link', icon: 'av_timer' },
];


const MENUITEMSGUEST = [
  { state: 'documentation', name: 'Documentation', type: 'link', icon: 'receipt' },
  { state: 'about', name: 'About', type: 'link', icon: 'av_timer' },
];

@Injectable()
export class MenuItems {
  constructor(private authService: AuthService) { }

  getMenuitem(): Menu[] {

    if (this.authService.isLoggedIn()) {
      return MENUITEMS;
    } else {
      return MENUITEMSGUEST;
    }
  }
}
