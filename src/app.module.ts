import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoriteModule } from './favorite/favorite.module';

import { typeOrmAsyncConfig } from './database/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoriteModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
