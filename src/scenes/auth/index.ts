import { Scenes } from 'telegraf';
import { SceneContext } from '../../types/telegraf';
import config from '../../config';
import { enterController, leaveController } from './handlers';

const scene = new Scenes.BaseScene<SceneContext>(config.TELEGRAM.SCENE.AUTH);

scene.enter(enterController);
scene.leave(leaveController);

export default scene;
