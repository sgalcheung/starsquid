export interface Config {
  squidexAppName?: string;
  squidexClientId?: string;
  squidexClientSecret?: string;
  squidexUrl?: string;
  squidexContentSchemas?: string[];
}

class ConfigService {
  private config: Config = {};

  setConfig(config: Config) {
    if (!config.squidexUrl) throw new Error("Missing `squidexUrl` in config.");
    if (!config.squidexAppName)
      throw new Error("Missing `squidexAppName` in config.");
    if (!config.squidexClientId)
      throw new Error("Missing `squidexClientId` in config.");
    if (!config.squidexClientSecret)
      throw new Error("Missing `squidexClientSecret` in config.");

    this.config = config;
  }

  getConfig(): Config {
    return this.config;
  }
}

// Export a single instance for application-wide use
export const configService = new ConfigService();
