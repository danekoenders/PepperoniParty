// import files
import * as PIXI from 'pixi.js';
import pizzaImage from './images/pizza.png';
import musicBackground from "url:./audio/bgm.mp3";
import tomatosauceIngredient from "./images/tomatensaus.png";
import cheeseIngredient from "./images/kaasbakje.png";
import unionIngredient from "./images/uienbakje.png";
import { Pizza } from "./pizza";

export class Game {

	pixiCanvas:any = document.getElementById("pixi-canvas");
  	pixi:PIXI.Application;
	resetButton:any = document.getElementById('reset');
	ingredientButtons:HTMLCollectionOf<Element>;
	selectedIngredient:PIXI.Text;
	tomatosauceIngredient:PIXI.Sprite;
	cheeseIngredient:PIXI.Sprite;
	unionIngredient:PIXI.Sprite;
	oldIngredient:number;
	currentIngredient:number;
	pizza:Pizza;
	sound:any;
	loader:PIXI.Loader;
	
	constructor() {
		// create a pixi canvas
		this.pixi = new PIXI.Application({ width: 1400, height: 700});
		this.pixiCanvas.appendChild(this.pixi.view);

		this.ingredientButtons = document.getElementsByClassName('ingredient');
		this.currentIngredient = -1;

		// preload all the textures
		this.loader = new PIXI.Loader();
		this.loader
			.add('pizzaTexture', pizzaImage) // laadt de images in de variabelen uit de import
      		.add("bgm", musicBackground)
			.add('tomatosauceTexture', tomatosauceIngredient)
			.add('cheeseTexture', cheeseIngredient)
			.add('unionTexture', unionIngredient)
			
		this.loader.load(() => this.loadCompleted());
	}

	// after loading is complete
	loadCompleted() {
		this.selectedIngredient = new PIXI.Text(`X`, {fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
		this.pixi.stage.addChild(this.selectedIngredient);

		this.tomatosauceIngredient = new PIXI.Sprite(this.loader.resources["tomatosauceTexture"].texture!);
		this.pixi.stage.addChild(this.tomatosauceIngredient);
		
		this.cheeseIngredient = new PIXI.Sprite(this.loader.resources["cheeseTexture"].texture!);
		this.pixi.stage.addChild(this.cheeseIngredient);

		this.unionIngredient = new PIXI.Sprite(this.loader.resources["unionTexture"].texture!);
		this.pixi.stage.addChild(this.unionIngredient);

		this.tomatosauceIngredient.scale.x = 0.5
		this.tomatosauceIngredient.scale.y = 0.5
		this.tomatosauceIngredient.x = 1200
		this.tomatosauceIngredient.interactive = true
        this.tomatosauceIngredient.buttonMode = true
        this.tomatosauceIngredient.on('pointerdown', () => this.toggleIngredient("tomatosauce"))

		this.cheeseIngredient.scale.x = 0.5
		this.cheeseIngredient.scale.y = 0.5
		this.cheeseIngredient.x = 1200
		this.cheeseIngredient.y = 124
		this.cheeseIngredient.interactive = true
        this.cheeseIngredient.buttonMode = true
        this.cheeseIngredient.on('pointerdown', () => this.toggleIngredient("cheese"))

		this.unionIngredient.scale.x = 0.5
		this.unionIngredient.scale.y = 0.5
		this.unionIngredient.x = 1200
		this.unionIngredient.y = 248
		this.unionIngredient.interactive = true
        this.unionIngredient.buttonMode = true
        this.unionIngredient.on('pointerdown', () => this.toggleIngredient("union"))

		this.pizza = new Pizza(
			this.loader.resources["pizzaTexture"].texture!,
			this.pixi.screen.width,
			this.pixi.screen.height
		);
		this.pixi.stage.addChild(this.pizza);
    
		this.sound = this.loader.resources["bgm"].data;
		this.sound.volume = 0.25;
		
		this.pixi.ticker.add((delta) => this.update(delta));
	}

	resetPizza() {
		if (this.resetButton.checked) {
			this.resetButton.disabled = true;
			return true;
		} else {
			return false;
		}
	}

	toggleIngredient(type: string) {
		if (type === "tomatosauce") {
			this.currentIngredient = 0
		} else if (type === "cheese") {
			this.currentIngredient = 1
		} else if (type === "union") {
			this.currentIngredient = 2
		}
	}

	update(delta:number) {

		if (this.currentIngredient != -1) {
			this.selectedIngredient.text = this.ingredientButtons[this.currentIngredient].name;
		} else {
			this.selectedIngredient.text = `X`;
		}
		
		this.pizza.update(delta, this.currentIngredient);
		this.sound.play();
		
		if (this.resetPizza()) {
			this.pizza.y -= 5 * delta;
			if (this.pizza.y < -600) {
				this.pixi.stage.removeChild(this.pizza);
				
				this.pizza = new Pizza(
					this.loader.resources["pizzaTexture"].texture!,
					this.pixi.screen.width,
					this.pixi.screen.height
				);
				this.pixi.stage.addChild(this.pizza);
				
				for (let x = 0; x < this.ingredientButtons.length; x++) {
					this.ingredientButtons[x].checked = false;
				}
				this.currentIngredient = -1;

				this.resetButton.checked = false;
				this.resetButton.disabled = false;
			}
		}
	}

}

new Game();
