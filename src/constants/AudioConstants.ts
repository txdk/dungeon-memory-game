const isProd = process.env.NODE_ENV === "production";
const BASE_SFX_PATH: string = isProd? "/sfx": "dungeon-memory-game/sfx";

export const SELECT_SOUND: string = `${BASE_SFX_PATH}/select.wav`;
export const HURT_SOUND: string = `${BASE_SFX_PATH}/hitHurt.wav`;
export const GAME_OVER_SOUND: string = `${BASE_SFX_PATH}/gameOver.wav`;