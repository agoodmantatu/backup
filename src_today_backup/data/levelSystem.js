export const getLevelFromXP = (xp) => Math.floor(xp / 100);
export const getXPForNextLevel = (level) => (level + 1) * 100;
export default { getLevelFromXP, getXPForNextLevel };
