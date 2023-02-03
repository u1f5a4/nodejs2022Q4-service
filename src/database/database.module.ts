import { Module } from '@nestjs/common';
import { AlbumDatabaseService } from './albumDatabase.service';
import { ArtistDatabaseService } from './artistDatabase.service';
import { FavoriteDatabaseService } from './favoriteDatabase.service';
import { TrackDatabaseService } from './trackDatabase.service';
import { UserDatabaseService } from './userDatabase.service';

@Module({
  controllers: [],
  providers: [
    UserDatabaseService,
    ArtistDatabaseService,
    AlbumDatabaseService,
    TrackDatabaseService,
    FavoriteDatabaseService,
  ],
  exports: [
    UserDatabaseService,
    ArtistDatabaseService,
    AlbumDatabaseService,
    TrackDatabaseService,
    FavoriteDatabaseService,
  ],
})
export class DatabaseModule {}
