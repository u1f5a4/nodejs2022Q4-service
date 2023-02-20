import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';

@Entity({ name: 'artists' })
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('boolean')
  grammy: boolean;

  // === Albums ===
  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  // === Tracks ===
  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];
}
