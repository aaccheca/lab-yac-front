import { AulaModel } from "./aula.model";
import { UserModel } from "./user.model";

export interface HorarioModel {
    id: number;
    maestro: UserModel;
    aula: AulaModel;
    horaInicio: string;
    horaFin: string;
    dia: string;
  }