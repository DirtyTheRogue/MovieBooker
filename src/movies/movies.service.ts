import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getNowPlaying(page = 1) {
    const url = `${this.configService.get('TMDB_BASE_URL')}/movie/now_playing`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        params: {
          api_key: this.configService.get('TMDB_API_KEY'),
          page,
        },
      }),
    );
    return response.data;
  }

  async searchMovies(query: string, page = 1) {
    const url = `${this.configService.get('TMDB_BASE_URL')}/search/movie`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        params: {
          api_key: this.configService.get('TMDB_API_KEY'),
          query,
          page,
        },
      }),
    );
    return response.data;
  }
}
