import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(dto: CreateArtistDto) {
    return this.artistRepository.save(this.artistRepository.create(dto));
  }

  findAll() {
    return this.artistRepository.find();
  }

  findOne(id: string) {
    return this.artistRepository.findOneBy({ id });
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistRepository.save({
      id,
      ...this.artistRepository.create(updateArtistDto),
    });
  }

  async remove(id: string) {
    // await this.favDB.removeArtist(id);
    // https://github.com/rolling-scopes-school/nodejs-course-template/pull/73
    // await this.albumDB.removeArtist(id);
    // await this.trackDB.removeArtist(id);
    return this.artistRepository.delete(id);
  }
}
