import { Scenes } from 'telegraf';
import { SceneContext } from '../../types/telegraf';
import config from '../../config';
import { chooseLanguageController, messageController, enterController, leaveController } from './handlers';
import { ACTIONS } from '../../actions';

const scene = new Scenes.BaseScene<SceneContext>(config.TELEGRAM.SCENE.LANGUAGE);

scene.enter(enterController);
scene.leave(leaveController);
scene.action(ACTIONS.choose_language.regex, chooseLanguageController);

scene.on('message', messageController);

export default scene;
