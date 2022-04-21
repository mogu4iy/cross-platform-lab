import { Scenes } from 'telegraf';
import { SceneContext } from '../../types/telegraf';
import config from '../../config';
import { messageController, enterController, leaveController } from './handlers';

const scene = new Scenes.BaseScene<SceneContext>(config.TELEGRAM.SCENE.INFO);

scene.enter(enterController);
scene.leave(leaveController);

scene.on('message', messageController);

export default scene;
