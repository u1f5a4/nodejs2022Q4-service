import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

import { UUID4 } from 'src/utils/UUID4';
import { StatusCodes } from 'http-status-codes';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  // ==== TRACKS ====
  @Post('/track/:id')
  async addTrack(@Param() { id }: UUID4) {
    if (!(await this.favoriteService.existsTrackEntity(id))) {
      throw new HttpException(
        'Track not exist',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
    return this.favoriteService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrack(@Param() { id }: UUID4) {
    if (!(await this.favoriteService.findTrack(id))) {
      throw new HttpException('Track not found', StatusCodes.NOT_FOUND);
    }
    return this.favoriteService.removeTrack(id);
  }

  // ==== ALBUMS ====
  @Post('/album/:id')
  async addAlbum(@Param() { id }: UUID4) {
    if (!(await this.favoriteService.existsAlbumEntity(id))) {
      throw new HttpException(
        'Album not exist',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
    return this.favoriteService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbum(@Param() { id }: UUID4) {
    if (!(await this.favoriteService.findAlbum(id))) {
      throw new HttpException('Album not found', StatusCodes.NOT_FOUND);
    }
    return this.favoriteService.removeAlbum(id);
  }

  // ==== ARTISTS ====
  @Post('/artist/:id')
  async addArtist(@Param() { id }: UUID4) {
    if (!(await this.favoriteService.existsArtistEntity(id))) {
      throw new HttpException(
        'Artist not exist',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
    return this.favoriteService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtist(@Param() { id }: UUID4) {
    if (!(await this.favoriteService.findArtist(id))) {
      throw new HttpException('Artist not found', StatusCodes.NOT_FOUND);
    }
    return this.favoriteService.removeArtist(id);
  }
}
