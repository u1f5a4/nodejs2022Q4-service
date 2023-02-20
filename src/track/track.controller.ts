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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UUID4 } from 'src/utils/UUID4';
import { StatusCodes } from 'http-status-codes';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: UUID4) {
    const entity = await this.trackService.findOne(id);
    if (!entity) {
      throw new HttpException('Not Found', StatusCodes.NOT_FOUND);
    }
    return entity;
  }

  @Put(':id')
  async update(@Param() { id }: UUID4, @Body() updateTrackDto: UpdateTrackDto) {
    if (!(await this.trackService.findOne(id))) {
      throw new HttpException('Not Found', StatusCodes.NOT_FOUND);
    }

    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param() { id }: UUID4) {
    if (!(await this.trackService.findOne(id))) {
      throw new HttpException('Not Found', StatusCodes.NOT_FOUND);
    }

    return this.trackService.remove(id);
  }
}
