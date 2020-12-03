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
  { state: 'surveys', name: 'Surveys', type: 'link', icon: 'list' },
  { state: 'analysis', name: 'Statistical analysis', type: 'link', icon: 'bar_chart' },
  // { state: 'crops', name: 'Crops', type: 'link', icon: 'eco' },
  { state: 'documentation', name: 'Documentation', type: 'link', icon: 'receipt' },
  { state: 'about', name: 'About', type: 'link', icon: 'av_timer' },
  // { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  // { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
  // { state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
  // { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
  // { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
  // { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
  // { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' },
  // {
  //   state: 'expansion',
  //   type: 'link',
  //   name: 'Expansion Panel',
  //   icon: 'vertical_align_center'
  // },
  // { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette' },
  // { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
  // {
  //   state: 'progress-snipper',
  //   type: 'link',
  //   name: 'Progress snipper',
  //   icon: 'border_horizontal'
  // },
  // {
  //   state: 'progress',
  //   type: 'link',
  //   name: 'Progress Bar',
  //   icon: 'blur_circular'
  // },
  // {
  //   state: 'dialog',
  //   type: 'link',
  //   name: 'Dialog',
  //   icon: 'assignment_turned_in'
  // },
  // { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
  // { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
  // { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
  // {
  //   state: 'slide-toggle',
  //   type: 'link',
  //   name: 'Slide Toggle',
  //   icon: 'all_inclusive'
  // }
];


const MENUITEMSGUEST = [
  // { state: 'crops', name: 'Crops', type: 'link', icon: 'eco' },
  { state: 'documentation', name: 'Documentation', type: 'link', icon: 'receipt' },
  { state: 'about', name: 'About', type: 'link', icon: 'av_timer' },
  // { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  // { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
  // { state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
  // { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
  // { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
  // { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
  // { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' },
  // {
  //   state: 'expansion',
  //   type: 'link',
  //   name: 'Expansion Panel',
  //   icon: 'vertical_align_center'
  // },
  // { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette' },
  // { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
  // {
  //   state: 'progress-snipper',
  //   type: 'link',
  //   name: 'Progress snipper',
  //   icon: 'border_horizontal'
  // },
  // {
  //   state: 'progress',
  //   type: 'link',
  //   name: 'Progress Bar',
  //   icon: 'blur_circular'
  // },
  // {
  //   state: 'dialog',
  //   type: 'link',
  //   name: 'Dialog',
  //   icon: 'assignment_turned_in'
  // },
  // { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
  // { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
  // { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
  // {
  //   state: 'slide-toggle',
  //   type: 'link',
  //   name: 'Slide Toggle',
  //   icon: 'all_inclusive'
  // }
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
