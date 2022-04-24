import { Markup } from 'telegraf';
import { HideableKBtn, HideableIKBtn, SceneContext } from '../types/telegraf';
import emoji from 'node-emoji';

export const backButton = (ctx: SceneContext, hide: boolean = false): HideableKBtn => {
  return Markup.button.text(emoji.emojify(ctx.session.i18n.__(`button__back`)), hide);
};

export const infoButton = (ctx: SceneContext, hide: boolean = false): HideableKBtn => {
  return Markup.button.text(emoji.emojify(ctx.session.i18n.__(`button__info`)), hide);
};

export const manageSubscriptionButton = (ctx: SceneContext, hide: boolean = false): HideableKBtn => {
  return Markup.button.text(emoji.emojify(ctx.session.i18n.__(`button__manage_subscription`)), hide);
};

export const manageChannelButton = (ctx: SceneContext, hide: boolean = false): HideableKBtn => {
  return Markup.button.text(emoji.emojify(ctx.session.i18n.__(`button__manage_channel`)), hide);
};

export const callbackButton = (ctx: SceneContext, buttonKey: string, action: string, hide: boolean = false): HideableIKBtn => {
  return Markup.button.callback(emoji.emojify(buttonKey), action, hide);
};