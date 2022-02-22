import { Context, Scenes } from 'telegraf';
import { I18n } from 'i18n';
import { SceneSession, WizardSessionData } from 'telegraf/typings/scenes';

export interface SceneSessionData extends Scenes.WizardSessionData {
  // will be available under `ctx.scene.session`
  removeMessage: number[];
}

interface SessionData extends Scenes.SceneSession<SceneSessionData> {
  // will be available under `ctx.session`
  __scenes: SceneSessionData & {
    state: object & {
      sceneHistory: string[]
    }
  };
  i18n: I18n;
}

export interface SceneContext extends Context {
  // will be available under `ctx`
  session: SessionData,
  scene: Scenes.SceneContextScene<SceneContext, SceneSessionData>;
  wizard: Scenes.WizardContextWizard<SceneContext>;

}