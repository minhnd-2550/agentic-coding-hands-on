import { RoleType } from "../enums/common";

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthConfig {
  storageStateDir: string;
  credentials: Record<RoleType, Credentials>;
}
