import { Injectable } from '@nestjs/common';
import { FavoriteDatabaseService } from 'src/database/favoriteDatabase.service';
import { TrackDatabaseService } from 'src/database/trackDatabase.service';
import { uuid4 } from 'src/utils/uuid4create';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackDB: TrackDatabaseService,
    private readonly favDB: FavoriteDatabaseService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const entity = {
      id: await uuid4(),
      ...createTrackDto,
    };
    await this.trackDB.create(entity);
    return entity;
  }

  findAll() {
    return this.trackDB.findAll();
  }

  findOne(id: string) {
    return this.trackDB.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.trackDB.update(id, updateTrackDto);
  }

  async remove(id: string) {
    await this.favDB.removeTrack(id);
    return this.trackDB.remove(id);
  }
}
