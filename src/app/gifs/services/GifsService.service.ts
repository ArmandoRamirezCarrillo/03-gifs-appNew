import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment.development';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);

  tredingGifs = signal<Gif[]>([]);
  tredingGifsLoading = signal(true);

  constructor(){
    this.loadTrendingGifs();
  }

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
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
      params: {
        api_key: environment.giphyApiKey,
        q: query,
        limit: 20,
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      console.log({gifs});
    });
  }

}
