import * as PIXI from "pixi.js"

export class Ingredient extends PIXI.Sprite {
    
    constructor(texture: PIXI.Texture, position:any) {
        super(texture)
        this.anchor.set(0.5);
        this.x = position.x;
        this.y = position.y;
    }
}