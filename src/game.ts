// import files
import * as PIXI from 'pixi.js'
import pizzaImage from './images/pizza.png'
import musicBackground from "url:./audio/bgm.mp3";
import { Pizza } from "./pizza"

export class Game {

	pixiCanvas:any = document.getElementById("pixi-canvas");
  	pixi:PIXI.Application;
	resetButton:any = document.getElementById('reset');
	ingredientButtons:HTMLCollectionOf<Element>;
	selectedIngredient:PIXI.Text;
	oldIngredient:number;
	currentIngredient:number;
	pizza:Pizza;
	sound:any;
	loader:PIXI.Loader;
	
	constructor() {
		// create a pixi canvas
		this.pixi = new PIXI.Application({ width: 800, height: 450});
		this.pixiCanvas.appendChild(this.pixi.view);

		this.ingredientButtons = document.getElementsByClassName('ingredient');
		this.currentIngredient = -1;

		// preload all the textures
		this.loader = new PIXI.Loader();
		this.loader
			.add('pizzaTexture', pizzaImage) // laadt de images in de variabelen uit de import
      		.add("bgm", musicBackground)

		this.loader.load(() => this.loadCompleted());
	}

	// after loading is complete
	loadCompleted() {
		this.selectedIngredient = new PIXI.Text(`X`, {fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
		this.pixi.stage.addChild(this.selectedIngredient);

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

	toggleIngredient() {
		for (var x = 0; x < this.ingredientButtons.length; x++) {
			if (typeof this.oldIngredient !== 'undefined' && this.oldIngredient != this.currentIngredient) {
				if (this.oldIngredient != -1 && this.ingredientButtons[this.oldIngredient].checked) {
					this.ingredientButtons[this.oldIngredient].checked = false;
				}
				this.oldIngredient = this.currentIngredient;
			}
			if (this.ingredientButtons[x].checked) {
				this.currentIngredient = x;
			}
		}
	}

	update(delta:number) {
		this.toggleIngredient();

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
