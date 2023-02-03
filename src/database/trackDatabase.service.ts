import { Injectable } from '@nestjs/common';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { Track } from 'src/track/entities/track.entity';

@Injectable()
export class TrackDatabaseService {
  private db = [];

  async create(entity: Track) {
    this.db.push(entity);
  }

  async findAll() {
    return this.db;
  }

  async findOne(id: string) {
    return this.db.find((entity) => entity.id === id);
  }

  async update(id: string, update: UpdateTrackDto) {
    const index = this.db.findIndex((entity) => entity.id === id);
    const current = this.db[index];
    this.db[index] = { ...current, ...update };
    return this.db[index];
  }

  async remove(id: string) {
    const index = this.db.findIndex((entity) => entity.id === id);
    this.db.splice(index, 1);
  }

  async removeAlbum(albumId: string) {
    // const track = this.db.find((entity) => entity.albumId === albumId);
    // if (track) this.update(track.id, { albumId: null });
    this.db.forEach((entity) => {
      if (entity.albumId === albumId) {
        entity.albumId = null;
      }
    });
  }

  async removeArtist(artistId: string) {
    // const track = this.db.find((entity) => entity.artistId === artistId);
    // if (track) this.update(track.id, { artistId: null });
    this.db.forEach((entity) => {
      if (entity.artistId === artistId) {
        entity.artistId = null;
      }
    });
  }
}
