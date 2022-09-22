// import files
import * as PIXI from 'pixi.js'
import playImage1 from './images/playbutton1.png'
import playImage2 from './images/playbutton2.png'

export class App {
    pixiCanvas:any = document.getElementById("pixi-canvas");
  	pixi:PIXI.Application;
    loader:PIXI.Loader
    
    constructor() {
        // create a pixi canvas
		this.pixi = new PIXI.Application({width: 700, backgroundAlpha: 0});
		this.pixiCanvas.appendChild(this.pixi.view);

        this.loader = new PIXI.Loader()
        this.loader
            .add("playButton", playImage1)
            .add("playButtonHover", playImage2)

        this.loader.load(() => this.doneLoading())
    }
    
    doneLoading() {
        let playButton = new PIXI.Sprite(this.loader.resources["playButton"].texture!)
        this.pixi.stage.addChild(playButton)

        playButton.width = this.pixi.screen.width / 2
        playButton.height = playButton.width
        playButton.position.set((this.pixi.screen.width / 4), (this.pixi.screen.height / 4));
        playButton.interactive = true
        playButton.buttonMode = true
        playButton.on('mouseover', () => { playButton.texture = this.loader.resources["playButtonHover"].texture! })
        playButton.on('mouseout', () => { playButton.texture = this.loader.resources["playButton"].texture! })
        playButton.on('pointerdown', this.onClick)
    }

    onClick() {
        window.location.href = "game.html"
    }
}

new App();
