import { Scenes } from 'telegraf';
import { SceneContext } from '../../types/telegraf';
import config from '../../config';
import {
  enterController,
  leaveController
} from './handlers';
import { messageController } from './handlers';

const scene = new Scenes.BaseScene<SceneContext>(config.TELEGRAM.SCENE.MANAGE_SUBSCRIPTION);

scene.enter(enterController);
scene.leave(leaveController);

scene.on('message', messageController);

export default scene;
