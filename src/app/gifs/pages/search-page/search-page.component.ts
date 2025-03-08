import { Component, inject } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifsService } from '../../services/GifsService.service';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {

  searchGif = inject(GifsService);

  onSearch(query:string){
    this.searchGif.searchGifs(query);
  }
}
