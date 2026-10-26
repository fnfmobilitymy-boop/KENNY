/** Future integration contracts. No implementation or security enforcement in M2. */
export type WorkspaceId = string;
export interface Workspace {
  id: WorkspaceId;
  name: string;
}
export interface Session {
  userId: string;
  displayName: string;
}
export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string } };
export interface AuthService {
  getSession(): Promise<ServiceResult<Session | null>>;
  signOut(): Promise<ServiceResult<void>>;
}
export interface WorkspaceService {
  list(): Promise<ServiceResult<Workspace[]>>;
}
export interface AiService {
  submit(input: {
    workspaceId: WorkspaceId;
    prompt: string;
    signal?: AbortSignal;
  }): Promise<ServiceResult<{ requestId: string }>>;
}
