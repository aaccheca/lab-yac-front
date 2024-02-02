import { AulaModel } from "./aula.model";
import { UserModel } from "./user.model";

export interface RegistroLaboratorioModel {
    id: number;
    usuario: UserModel;
    aula: AulaModel;
    firma: string;
    guardiaTurno: string;
    novedades: string;
    fecha: string;
    horaIngreso: string;
    horaSalida: string;
  }