import { Injectable } from '@nestjs/common';
import { Favorite } from 'src/favorite/entities/favorite.entity';

@Injectable()
export class FavoriteDatabaseService {
  private db: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async findAll(): Promise<Favorite> {
    return this.db;
  }

  // ==== TRACKS ====
  async addTrack(id: string) {
    this.db.tracks.push(id);
  }

  async findTrack(id: string) {
    return this.db.tracks.find((entity) => entity === id);
  }

  async removeTrack(id: string) {
    const index = this.db.tracks.findIndex((entity) => entity === id);
    this.db.tracks.splice(index, 1);
  }

  // ==== ALBUMS ====
  async addAlbum(id: string) {
    this.db.albums.push(id);
  }

  async findAlbum(id: string) {
    return this.db.albums.find((entity) => entity === id);
  }

  async removeAlbum(id: string) {
    const index = this.db.albums.findIndex((entity) => entity === id);
    this.db.albums.splice(index, 1);
  }

  // ==== ARTISTS ====
  async addArtist(id: string) {
    this.db.artists.push(id);
  }

  async findArtist(id: string) {
    return this.db.artists.find((entity) => entity === id);
  }

  async removeArtist(id: string) {
    const index = this.db.artists.findIndex((entity) => entity === id);
    this.db.artists.splice(index, 1);
  }
}
