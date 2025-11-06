export class MascotaDto {
  id?: number;
  nombre: string;
  especie: string;
  raza?: string | null;
  edad?: number | null; // 👈 corregido
  dueno_id: number;
}
