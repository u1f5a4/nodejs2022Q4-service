import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';

import { Favorite } from './entities/favorite.entity';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Track, Album, Artist])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
