import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Movies') 
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('now-playing')
  @ApiOperation({ summary: 'Récupérer les films en salle' })
  getNowPlaying(@Query('page') page: number) {
    return this.moviesService.getNowPlaying(page);
  }
  
  @Get('search')
  @ApiOperation({ summary: 'Rechercher un film par titre' })
  getSearch(
    @Query('query') query: string,
    @Query('page') page: number,
  ) {
    return this.moviesService.searchMovies(query, page);
  }
}  
