import { Scenes } from 'telegraf';
import { SceneContext } from '../../types/telegraf';
import config from '../../config';
import { chooseLanguageController, enterController, leaveController } from './handlers';
import { ACTIONS } from './actions';

const scene = new Scenes.BaseScene<SceneContext>(config.TELEGRAM.SCENE.LANGUAGE);

scene.enter(enterController);
scene.leave(leaveController);
scene.action(ACTIONS.choose_lang.regex, chooseLanguageController);

export default scene;
