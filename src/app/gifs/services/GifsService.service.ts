import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

import { environment } from '@environments/environment.development';
import { Gif } from '../interfaces/gif.interface';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { GifMapper } from '../mapper/gif.mapper';

const GIF_KEY = 'searchHistory'
const loadFromLocalStorage = () => {
  const storedGifs = localStorage.getItem(GIF_KEY) ?? '{}';
  return JSON.parse(storedGifs);
}

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);

  tredingGifs = signal<Gif[]>([]);
  tredingGifsLoading = signal(true);
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor(){
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    localStorage.setItem(GIF_KEY, JSON.stringify(this.searchHistory()));
  })

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.tredingGifs.set(gifs);
      this.tredingGifsLoading.set(false);
    })
  }

  searchGifs(query:string){
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
      params: {
        api_key: environment.giphyApiKey,
        q: query,
        limit: 20,
      }
    }).pipe(
      map(({data}) => GifMapper.mapGiphyItemsToGifArray(data)),
      tap(items => this.searchHistory.update(history => ({...history, [query.toLowerCase()]: items})))
    )
    // .subscribe((resp) => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
    //   console.log({gifs});
    // });
  }

  getHistoryGifs(query:string):Gif[]{
    return this.searchHistory()[query.toLowerCase()] ?? [];
  }

}
