import * as PIXI from "pixi.js"
import sauceImage from './images/sauce.png'
import cheeseImage from './images/chuckecheese.png'
import onionImage from './images/onion.png'
import { Ingredient } from "./ingredient"

export class Pizza extends PIXI.Sprite {
    
    loader:PIXI.Loader;
    hitbox:PIXI.Circle;
	drawPosition:any = null;
	drawingStarted:boolean = false;
	ingredients:Ingredient[] = [];

    constructor(texture: PIXI.Texture, width:any, height:any) {
        
        super(texture);
		this.anchor.set(0.5);
		this.width = height / 2;
		this.height = height / 2;
		this.position.set(width / 2, height / 2);
		this.interactive = true;
        this.hitbox = new PIXI.Circle(0, 0, (this.width / 2));
        
		const onDown = (e:any) => {
			const position = this.toLocal(e.data.global);
			position.x;
			position.y;

			if (this.insideBorder(position)) {
                this.drawPosition = position;
				this.drawingStarted = true;
			}
		}

		const onMove = (e:any) => {
			if (this.drawingStarted) {
				const position = this.toLocal(e.data.global);
				position.x;
				position.y;

				if (this.insideBorder(position)) {
					this.drawPosition = position;
				} else {
					this.drawingStarted = false;
				}
			}
		}

		const onUp = (e:any) => {
			this.drawingStarted = false;
		}

		this.on('mousedown', onDown);
		this.on('touchstart', onDown);
		this.on('mousemove', onMove);
		this.on('touchmove', onMove);
		this.on('mouseup', onUp);
		this.on('touchend', onUp);

        this.loader = new PIXI.Loader();
		this.loader.add('sauceTexture', sauceImage); // laadt de images in de variabelen uit de import
		this.loader.add('cheeseTexture', cheeseImage);
		this.loader.add('onionTexture', onionImage);
		this.loader.load(() => {});
    }
    
	insideBorder(position:any) {
		if (position != null) {
			const bounds = this.hitbox;
	
			let distance = (bounds.x - position.x) * (bounds.x - position.x) + (bounds.y - position.y) * (bounds.y - position.y);
			let radius = bounds.radius * bounds.radius;
			if (distance < radius) {
				return true;
			}
			return false;
		}
	}


    public update(delta:number, ingredientSelected:number) {
		if (this.insideBorder(this.drawPosition)) {
            if (this.drawingStarted) {
					if (ingredientSelected == 0) {
						let sauce = new Ingredient(this.loader.resources["sauceTexture"].texture!, this.drawPosition)
						this.addChild(sauce);
						this.ingredients.push(sauce);
					} else if (ingredientSelected == 1) {
						let cheese = new Ingredient(this.loader.resources["cheeseTexture"].texture!, this.drawPosition)
						this.addChild(cheese);
						this.ingredients.push(cheese);
					} else if (ingredientSelected == 2) {
						let onion = new Ingredient(this.loader.resources["onionTexture"].texture!, this.drawPosition)
						this.addChild(onion);
						this.ingredients.push(onion);
					}
			}
		}
    }


}