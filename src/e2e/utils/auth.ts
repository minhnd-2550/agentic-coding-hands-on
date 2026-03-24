import { readFileSync, existsSync, mkdirSync, unlinkSync } from "fs";
import { join } from "path";
import { Encoding, RoleType } from "../enums/common";

const STORAGE_STATE_DIR = join(__dirname, "..", "auth");

export class AuthManager {
  private static instance: AuthManager;

  private constructor() {
    this.ensureAuthDirectoryExists();
  }

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  private ensureAuthDirectoryExists(): void {
    if (!existsSync(STORAGE_STATE_DIR)) {
      mkdirSync(STORAGE_STATE_DIR, { recursive: true });
    }
  }

  private getStorageStatePath(role: RoleType): string {
    return join(STORAGE_STATE_DIR, `${role}.json`);
  }

  async getStorageState(role: RoleType) {
    const storageStatePath = this.getStorageStatePath(role);
    if (!existsSync(storageStatePath)) {
      throw new Error(
        `Auth state file not found for ${role}. Run auth setup first.`
      );
    }
    return JSON.parse(readFileSync(storageStatePath, Encoding.Utf8));
  }

  async isAuthenticated(role: RoleType): Promise<boolean> {
    return existsSync(this.getStorageStatePath(role));
  }

  async clearAuthState(role: RoleType): Promise<void> {
    const storageStatePath = this.getStorageStatePath(role);
    if (existsSync(storageStatePath)) {
      unlinkSync(storageStatePath);
    }
  }

  async clearAllAuthStates(): Promise<void> {
    for (const role of Object.values(RoleType)) {
      await this.clearAuthState(role);
    }
  }
}
