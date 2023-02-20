import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async create(dto: CreateTrackDto) {
    return this.trackRepository.save(this.trackRepository.create(dto));
  }

  findAll() {
    return this.trackRepository.find();
  }

  findOne(id: string) {
    return this.trackRepository.findOneBy({ id });
  }

  update(id: string, dto: UpdateTrackDto) {
    return this.trackRepository.save({
      id,
      ...dto,
    });
  }

  async remove(id: string) {
    // await this.favDB.removeTrack(id);
    // return this.trackDB.remove(id);
    return this.trackRepository.delete(id);
  }
}
