import { Injectable } from '@nestjs/common';
import { AlbumDatabaseService } from 'src/database/albumDatabase.service';
import { ArtistDatabaseService } from 'src/database/artistDatabase.service';
import { FavoriteDatabaseService } from 'src/database/favoriteDatabase.service';
import { TrackDatabaseService } from 'src/database/trackDatabase.service';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favDB: FavoriteDatabaseService,
    private readonly trackDB: TrackDatabaseService,
    private readonly albumDB: AlbumDatabaseService,
    private readonly artistDB: ArtistDatabaseService,
  ) {}

  async findAll() {
    const { artists, albums, tracks } = await this.favDB.findAll();

    return {
      artists: await Promise.all(
        artists.map((id) => this.artistDB.findOne(id)),
      ),
      albums: await Promise.all(albums.map((id) => this.albumDB.findOne(id))),
      tracks: await Promise.all(tracks.map((id) => this.trackDB.findOne(id))),
    };
  }

  // ==== TRACKS ====
  addTrack(id: string) {
    return this.favDB.addTrack(id);
  }

  existsTrackEntity(id: string) {
    return this.trackDB.findOne(id);
  }

  findTrack(id: string) {
    return this.favDB.findTrack(id);
  }

  removeTrack(id: string) {
    return this.favDB.removeTrack(id);
  }

  // ==== ALBUMS ====
  addAlbum(id: string) {
    return this.favDB.addAlbum(id);
  }

  existsAlbumEntity(id: string) {
    return this.albumDB.findOne(id);
  }

  findAlbum(id: string) {
    return this.favDB.findAlbum(id);
  }

  removeAlbum(id: string) {
    return this.favDB.removeAlbum(id);
  }

  // ==== ARTISTS ====
  addArtist(id: string) {
    return this.favDB.addArtist(id);
  }

  existsArtistEntity(id: string) {
    return this.artistDB.findOne(id);
  }

  findArtist(id: string) {
    return this.favDB.findArtist(id);
  }

  removeArtist(id: string) {
    return this.favDB.removeArtist(id);
  }
}
