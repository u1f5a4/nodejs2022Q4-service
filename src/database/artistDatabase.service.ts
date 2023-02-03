import { Injectable } from '@nestjs/common';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class ArtistDatabaseService {
  private db = [];

  async create(entity: Artist) {
    this.db.push(entity);
  }

  async findAll() {
    return this.db;
  }

  async findOne(id: string) {
    return this.db.find((entity) => entity.id === id);
  }

  async update(id: string, update: UpdateArtistDto) {
    const index = this.db.findIndex((entity) => entity.id === id);
    const current = this.db[index];
    this.db[index] = { ...current, ...update };
    return this.db[index];
  }

  async remove(id: string) {
    const index = this.db.findIndex((entity) => entity.id === id);
    this.db.splice(index, 1);
  }
}
