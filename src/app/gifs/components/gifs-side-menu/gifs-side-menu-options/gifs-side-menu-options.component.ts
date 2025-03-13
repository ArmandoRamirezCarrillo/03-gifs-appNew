import { Component, inject } from '@angular/core';
import { MenuOption } from '../../../interfaces/gif-menu-option.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from '../../../services/GifsService.service';

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.component.html',
})
export class GifsSideMenuOptionsComponent {

  gifService = inject(GifsService);

  menuOptions:MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      route: '/dashboard/trending',
      subLabel: 'Gifs populares'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      route: '/dashboard/search',
      subLabel: 'Buscar Gifs'
    },
  ]
}
