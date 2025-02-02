const isProd: boolean = process.env.NODE_ENV === "production";
const BASE_SFX_PATH: string = isProd? "./sfx": "./dungeon-memory-game/sfx";

export const SELECT_SOUND: string = `${BASE_SFX_PATH}/select.wav`;
export const HURT_SOUND: string = `${BASE_SFX_PATH}/hithurt.wav`;
export const GAME_OVER_SOUND: string = `${BASE_SFX_PATH}/gameover.wav`;
export const COIN_SOUND: string = `${BASE_SFX_PATH}/pickupcoin.wav`;
export const POWERUP_SOUND: string = `${BASE_SFX_PATH}/powerup.wav`;
export const CLICK_SOUND: string = `${BASE_SFX_PATH}/click.wav`;
export const LEVEL_CLEAR_SOUND: string = `${BASE_SFX_PATH}/levelclear.wav`;