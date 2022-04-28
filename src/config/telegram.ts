export interface ITelegramConfig {
  readonly TOKEN: string;
  readonly CHAT_TYPE: {
    readonly PRIVATE: string
    readonly GROUP: string
    readonly SUPERGROUP: string
    readonly CHANNEL: string
  };
  readonly SCENE: {
    readonly MAIN: string
    readonly START: string
    readonly AUTH: string
    readonly LANGUAGE: string
    readonly INFO: string
    readonly MANAGE_SUBSCRIPTION: string
    readonly MANAGE_CHANNEL: string
  };
}

export function TelegramConfig(): ITelegramConfig {
  return {
    TOKEN: String(process.env.TELEGRAM_TOKEN),
    CHAT_TYPE: {
      PRIVATE: 'private',
      GROUP: 'group',
      SUPERGROUP: 'supergroup',
      CHANNEL: 'channel'
    },
    SCENE: {
      MAIN: 'main',
      START: 'start',
      AUTH: 'auth',
      LANGUAGE: 'language',
      INFO: 'info',
      MANAGE_SUBSCRIPTION: 'manage_subscription',
      MANAGE_CHANNEL: 'manage_channel'
    }
  };
}

