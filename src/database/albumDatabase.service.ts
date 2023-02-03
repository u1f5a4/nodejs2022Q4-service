import { Injectable } from '@nestjs/common';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class AlbumDatabaseService {
  private db = [];

  async create(entity: Album) {
    this.db.push(entity);
  }

  async findAll() {
    return this.db;
  }

  async findOne(id: string) {
    return this.db.find((entity) => entity.id === id);
  }

  async update(id: string, update: UpdateAlbumDto) {
    const index = this.db.findIndex((entity) => entity.id === id);
    const current = this.db[index];
    this.db[index] = { ...current, ...update };
    return this.db[index];
  }

  async remove(id: string) {
    const index = this.db.findIndex((entity) => entity.id === id);
    this.db.splice(index, 1);
  }

  async removeArtist(artistId: string) {
    this.db.forEach((entity) => {
      if (entity.artistId === artistId) {
        entity.artistId = null;
      }
    });
  }
}
