import { IsUUID, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId: string | null = null;
}

export class UpdateAlbumDto extends CreateAlbumDto {}
