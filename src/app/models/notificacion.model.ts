import { UserModel } from "./user.model";

export interface NotificacionModel {
    id: number;
    maestro: UserModel;
    notificacion: string;
  }