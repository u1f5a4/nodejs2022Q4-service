import { Injectable } from '@nestjs/common';
import { AlbumDatabaseService } from 'src/database/albumDatabase.service';
import { ArtistDatabaseService } from 'src/database/artistDatabase.service';
import { FavoriteDatabaseService } from 'src/database/favoriteDatabase.service';
import { TrackDatabaseService } from 'src/database/trackDatabase.service';
import { uuid4 } from 'src/utils/uuid4create';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistDB: ArtistDatabaseService,
    private readonly trackDB: TrackDatabaseService,
    private readonly albumDB: AlbumDatabaseService,
    private readonly favDB: FavoriteDatabaseService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const entity = { ...createArtistDto, id: await uuid4() };
    this.artistDB.create(entity);
    return entity;
  }

  findAll() {
    return this.artistDB.findAll();
  }

  findOne(id: string) {
    return this.artistDB.findOne(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistDB.update(id, updateArtistDto);
  }

  async remove(id: string) {
    await this.favDB.removeArtist(id);
    // https://github.com/rolling-scopes-school/nodejs-course-template/pull/73
    // await this.albumDB.removeArtist(id);
    await this.trackDB.removeArtist(id);
    return this.artistDB.remove(id);
  }
}
