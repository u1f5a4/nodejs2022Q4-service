import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpCode,
  Put,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { UUID4 } from 'src/utils/UUID4';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: UUID4) {
    const artist = await this.artistService.findOne(id);
    if (!artist) throw new HttpException('Not found', StatusCodes.NOT_FOUND);
    return artist;
  }

  @Put(':id')
  async update(
    @Param() { id }: UUID4,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistService.findOne(id);
    if (!artist) throw new HttpException('Not found', StatusCodes.NOT_FOUND);
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param() { id }: UUID4) {
    const artist = await this.artistService.findOne(id);
    if (!artist) throw new HttpException('Not found', StatusCodes.NOT_FOUND);
    return this.artistService.remove(id);
  }
}
