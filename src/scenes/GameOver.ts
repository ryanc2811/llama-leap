
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../components/ButtonComponent";
/* START-USER-IMPORTS */
import registerRoundedRectangleGraphicsFactory from "../roundedRectangle/registerRoundedRectangleGraphicsFactory";


/* END-USER-IMPORTS */

export default class GameOver extends Phaser.Scene {

	constructor() {
		super("GameOver");

		/* START-USER-CTR-CODE */

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

		// gameOverScreen
		this.add.image(360, 640, "gameover");

		// btn_restart
		const btn_restart = this.add.image(360, 928, "btn_restart_atlas", "btn_restart_norm.png");

		// btn_leaderboard
		const btn_leaderboard = this.add.image(182, 928, "btn_leaderboard_atlas", "btn_leaderboard_norm.png");

		// btn_menu
		const btn_menu = this.add.image(534, 928, "btn_menu_atlas", "btn_menu_norm.png");

		// btn_restart (components)
		const btn_restartButtonComponent = new ButtonComponent(btn_restart);
		btn_restartButtonComponent.disabledFrame = "btn_restart_disabled.png";
		btn_restartButtonComponent.normFrame = "btn_restart_norm.png";
		btn_restartButtonComponent.overFrame = "btn_restart_hover.png";
		btn_restartButtonComponent.downFrame = "btn_restart_down.png";
		btn_restartButtonComponent.callback = this.restart.bind(this);;
		btn_restartButtonComponent.context = this;

		// btn_leaderboard (components)
		const btn_leaderboardButtonComponent = new ButtonComponent(btn_leaderboard);
		btn_leaderboardButtonComponent.disabledFrame = "btn_leaderboard_disabled.png";
		btn_leaderboardButtonComponent.normFrame = "btn_leaderboard_norm.png";
		btn_leaderboardButtonComponent.overFrame = "btn_leaderboard_hover.png";
		btn_leaderboardButtonComponent.downFrame = "btn_leaderboard_down.png";
		btn_leaderboardButtonComponent.context = this;

		// btn_menu (components)
		const btn_menuButtonComponent = new ButtonComponent(btn_menu);
		btn_menuButtonComponent.disabledFrame = "btn_menu_disabled.png";
		btn_menuButtonComponent.normFrame = "btn_menu_norm.png";
		btn_menuButtonComponent.overFrame = "btn_menu_hover.png";
		btn_menuButtonComponent.downFrame = "btn_menu_down.png";
		btn_menuButtonComponent.context = this;

		this.btn_restart = btn_restart;
		this.btn_leaderboard = btn_leaderboard;
		this.btn_menu = btn_menu;

		this.events.emit("scene-awake");
	}

	private btn_restart!: Phaser.GameObjects.Image;
	private btn_leaderboard!: Phaser.GameObjects.Image;
	private btn_menu!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();
		this.btn_restart.setInteractive();
		this.btn_menu.setInteractive();
		this.btn_leaderboard.setInteractive();
		const restartButtonComponent = ButtonComponent.getComponent(this.btn_restart);
    // Disable the restart button initially
    restartButtonComponent.enabled = false;

    // Schedule enabling the restart button after a delay
    this.time.delayedCall(3000, () => {  // 3000 milliseconds = 3 seconds
        restartButtonComponent.enabled = true;
    });

	let score = this.data.get("score");
	console.log(score);
	}

	restart(){
		this.scene.start('Level');  // 'Level' should be the key of your level scene
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here



