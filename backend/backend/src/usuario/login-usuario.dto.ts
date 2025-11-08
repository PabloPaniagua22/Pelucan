import { IsString, MinLength } from 'class-validator';
export class LoginUsuarioDto {
  @IsString()
  correo: string;

  @IsString()
  @MinLength(8)
  contrasena: string;
}
