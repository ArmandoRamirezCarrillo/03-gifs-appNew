import { AfterViewInit, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
// import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifsService } from '../../services/GifsService.service';
import { ScrollStateService } from 'src/app/shared/service/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  // imports: [GifsListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  // gifs = computed(() => this.gifService.tredingGifs()); //Opcion 1
  gifService = inject(GifsService); //Opcion 2
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);
    if(isAtBottom){
      this.gifService.loadTrendingGifs();
    }
  }
}
