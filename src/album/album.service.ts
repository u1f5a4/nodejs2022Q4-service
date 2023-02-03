import { Injectable } from '@nestjs/common';
import { AlbumDatabaseService } from 'src/database/albumDatabase.service';
import { FavoriteDatabaseService } from 'src/database/favoriteDatabase.service';
import { TrackDatabaseService } from 'src/database/trackDatabase.service';
import { uuid4 } from 'src/utils/uuid4create';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumDB: AlbumDatabaseService,
    private readonly trackDB: TrackDatabaseService,
    private readonly favDB: FavoriteDatabaseService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const entity = { ...createAlbumDto, id: await uuid4() };
    this.albumDB.create(entity);
    return entity;
  }

  findAll() {
    return this.albumDB.findAll();
  }

  findOne(id: string) {
    return this.albumDB.findOne(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.albumDB.update(id, updateAlbumDto);
  }

  async remove(id: string) {
    await this.favDB.removeAlbum(id);
    await this.trackDB.removeAlbum(id);
    return this.albumDB.remove(id);
  }
}
