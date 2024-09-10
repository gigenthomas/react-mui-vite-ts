import { UserEvent } from "./user-event";
import { AppError } from "./app-error";

export interface UserEvents {
    userEvents: UserEvent[] | null;
    userEventError: AppError | null;
  }
  