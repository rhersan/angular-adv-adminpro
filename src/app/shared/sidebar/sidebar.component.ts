import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public menu: any = null!;

  constructor(private sidebarService:SidebarService) {
    this.menu = this.sidebarService.menu;
  }
}
