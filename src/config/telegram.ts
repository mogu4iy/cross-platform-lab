export interface ITelegramConfig {
  readonly TOKEN: string;
  readonly LANGUAGE: {
    readonly RU: string,
    readonly EN: string
  },
  readonly SCENE: {
    readonly MAIN: string,
    readonly START: string
    readonly LANGUAGE: string,
    readonly INFO: string,
    readonly MANAGE_SUBSCRIPTION: string,
    readonly MANAGE_CHANNELS: string
  };
}

export function TelegramConfig(): ITelegramConfig {
  return {
    TOKEN: String(process.env.TELEGRAM_TOKEN),
    LANGUAGE: {
      RU: 'ru',
      EN: 'en'
    },
    SCENE: {
      MAIN: 'main',
      START: 'start',
      LANGUAGE: 'language',
      INFO: 'info',
      MANAGE_SUBSCRIPTION: "manage_subscription",
      MANAGE_CHANNELS: "manage_channels"
    }
  };
}

