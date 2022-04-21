export interface IServerConfig {
  PORT: number;
}

export function ServerConfig(): IServerConfig {
  return {
    PORT: Number(process.env.PORT) ?? 5000
  };
}

