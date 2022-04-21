export interface ITelegramConfig {
  readonly TOKEN: string;
  readonly SCENE: {
    readonly MAIN: string,
    readonly START: string
    readonly LANGUAGE: string,
    readonly INFO: string,
    readonly MANAGE_SUBSCRIPTION: string,
    readonly MANAGE_CHANNEL: string
  };
}

export function TelegramConfig(): ITelegramConfig {
  return {
    TOKEN: String(process.env.TELEGRAM_TOKEN),
    SCENE: {
      MAIN: 'main',
      START: 'start',
      LANGUAGE: 'language',
      INFO: 'info',
      MANAGE_SUBSCRIPTION: 'manage_subscription',
      MANAGE_CHANNEL: 'manage_channel'
    }
  };
}

