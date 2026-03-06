export const enum Emotions {
    HAPPY = "😊",
    AFRAID = "😨",
    SAD = "😢",
    BORED = "😒",
    SICK = "🤧",
    HORNY = "😏",
    ANGRY = "🤬",
    NONE = "😐",
}

export const enum LifeState {
    REGENERATION ,
    STARVING,
    DYING,
    DEAD = "⚰️",
}

export type EntityState = {
    name: string, 
    hungerPoints: number,
    healthPoints: number,
    emotion: Emotions,
    state: LifeState,
}