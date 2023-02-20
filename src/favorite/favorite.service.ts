import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Favorite } from './entities/favorite.entity';

const ALL_FAVORITES = 1;

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favRepository: Repository<Favorite>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async findAll() {
    return await this.favRepository.findOne({
      where: { id: ALL_FAVORITES },
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
  }

  // ==== Track ====
  async addTrack(id: string) {
    const favs = await this.findAll();
    console.log(favs);

    favs.tracks = [...favs.tracks, { id } as Track];
    return this.favRepository.save({ ...favs });
  }

  existsTrackEntity(id: string) {
    return this.trackRepository.findOneBy({ id });
  }

  async findTrack(id: string) {
    const favs = await this.findAll();
    return favs.tracks.some((track) => track.id === id);
  }

  async removeTrack(id: string) {
    const favs = await this.findAll();
    favs.tracks = favs.tracks.filter((track) => track.id !== id);
    return this.favRepository.save({ ...favs });
  }

  // ==== Album ====
  async addAlbum(id: string) {
    const favs = await this.findAll();
    favs.albums = [...favs.albums, { id } as Album];
    return this.favRepository.save({ ...favs });
  }

  existsAlbumEntity(id: string) {
    return this.albumRepository.findOneBy({ id });
  }

  async findAlbum(id: string) {
    const favs = await this.findAll();
    return favs.albums.some((album) => album.id === id);
  }

  async removeAlbum(id: string) {
    const favs = await this.findAll();
    favs.albums = favs.albums.filter((album) => album.id !== id);
    return this.favRepository.save({ ...favs });
  }

  // ==== Artist ====
  async addArtist(id: string) {
    const favs = await this.findAll();
    favs.artists = [...favs.artists, { id } as Artist];
    return this.favRepository.save({ ...favs });
  }

  existsArtistEntity(id: string) {
    return this.artistRepository.findOneBy({ id });
  }

  async findArtist(id: string) {
    const favs = await this.findAll();
    return favs.artists.some((artist) => artist.id === id);
  }

  async removeArtist(id: string) {
    const favs = await this.findAll();
    favs.artists = favs.artists.filter((artist) => artist.id !== id);
    return this.favRepository.save({ ...favs });
  }
}
