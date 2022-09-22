import * as PIXI from "pixi.js"

export class Bottom extends PIXI.Sprite {
    
    constructor(texture: PIXI.Texture, width:any, height:any) {
        super(texture)
        this.anchor.set(0.5);
		this.width = width;
		this.height = height;
    }
}