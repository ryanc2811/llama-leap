
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../components/ButtonComponent";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MainMenu extends Phaser.Scene {

	constructor() {
		super("MainMenu");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// background
		const background = this.add.layer();

		// backgroundImg
		const backgroundImg = this.add.rectangle(0, 0, 720, 1280);
		backgroundImg.setOrigin(0, 0);
		backgroundImg.isFilled = true;
		backgroundImg.fillColor = 16119285;
		background.add(backgroundImg);

		// main-screen
		this.add.image(360, 640, "main-menu");

		// btn_play
		const btn_play = this.add.image(360, 1036, "btn_play_atlas", "btn_play_norm.png");

		// btn_play (components)
		const btn_playButtonComponent = new ButtonComponent(btn_play);
		btn_playButtonComponent.disabledFrame = "btn_play_disabled.png";
		btn_playButtonComponent.normFrame = "btn_play_norm.png";
		btn_playButtonComponent.overFrame = "btn_play_hover.png";
		btn_playButtonComponent.downFrame = "btn_play_down.png";
		btn_playButtonComponent.callback = this.startGame.bind(this);
		btn_playButtonComponent.context = this;

		this.btn_play = btn_play;

		this.events.emit("scene-awake");
	}

	private btn_play!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		this.btn_play.setInteractive();
	}

	startGame(){
		this.scene.start('Preload');  
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
