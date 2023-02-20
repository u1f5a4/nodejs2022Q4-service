import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async create(dto: CreateAlbumDto) {
    return this.albumRepository.save(this.albumRepository.create(dto));
  }

  findAll() {
    return this.albumRepository.find();
  }

  findOne(id: string) {
    return this.albumRepository.findOneBy({ id });
  }

  update(id: string, dto: UpdateAlbumDto) {
    return this.albumRepository.save({
      id,
      ...this.albumRepository.create(dto),
    });
  }

  async remove(id: string) {
    // await this.favDB.removeAlbum(id);
    // await this.trackDB.removeAlbum(id);
    // return this.albumDB.remove(id);
    await this.albumRepository.delete(id);
  }
}
