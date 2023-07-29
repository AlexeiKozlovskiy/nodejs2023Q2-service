import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  artistId: string | null = null;

  @IsOptional()
  albumId: string | null = null;

  @IsInt()
  duration: number;
}

export class UpdateTrackDto extends CreateTrackDto {}
