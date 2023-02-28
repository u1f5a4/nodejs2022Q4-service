import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { UUID4 } from 'src/utils/UUID4';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: UUID4) {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new HttpException('Album not found', StatusCodes.NOT_FOUND);
    }
    return album;
  }

  @Put(':id')
  async update(@Param() { id }: UUID4, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (!(await this.albumService.findOne(id))) {
      throw new HttpException('Album not found', StatusCodes.NOT_FOUND);
    }
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param() { id }: UUID4) {
    if (!(await this.albumService.findOne(id))) {
      throw new HttpException('Album not found', StatusCodes.NOT_FOUND);
    }
    return this.albumService.remove(id);
  }
}
