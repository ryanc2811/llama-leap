
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonComponent from "../components/ButtonComponent";
/* START-USER-IMPORTS */
import leaderboardUserContainer from "../prefabs/leaderboardUserContainer";
/* END-USER-IMPORTS */

export default class Leaderboard extends Phaser.Scene {

	constructor() {
		super("Leaderboard");

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

		// leaderboard-menu
		this.add.image(360, 640, "leaderboard-menu");

		// btn_exit
		const btn_exit = this.add.image(360, 1015, "btn_exit_atlas", "btn_exit_norm.png");

		// userScoreTxt
		const userScoreTxt = this.add.text(519, 293, "", {});
		userScoreTxt.setOrigin(1, 0);
		userScoreTxt.text = "99999999999";
		userScoreTxt.setStyle({ "align": "right", "color": "#212F60", "fixedWidth":200,"fontFamily": "Lato", "fontSize": "30px", "fontStyle": "bold" });

		// userRankTxt
		const userRankTxt = this.add.text(128, 293, "", {});
		userRankTxt.text = "1.";
		userRankTxt.setStyle({ "color": "#212F60", "fixedWidth":40,"fontFamily": "Lato", "fontSize": "30px", "fontStyle": "bold" });

		// lists
		const leaderboardContainers: Array<any> = [];

		// btn_exit (components)
		const btn_exitButtonComponent = new ButtonComponent(btn_exit);
		btn_exitButtonComponent.disabledFrame = "btn_exit_disabled.png";
		btn_exitButtonComponent.normFrame = "btn_exit_norm.png";
		btn_exitButtonComponent.overFrame = "btn_exit_hover.png";
		btn_exitButtonComponent.downFrame = "btn_exit_down.png";
		btn_exitButtonComponent.callback = this.gameOver.bind(this);
		btn_exitButtonComponent.context = this;

		this.btn_exit = btn_exit;
		this.userScoreTxt = userScoreTxt;
		this.leaderboardContainers = leaderboardContainers;

		this.events.emit("scene-awake");
	}

	private btn_exit!: Phaser.GameObjects.Image;
	private userScoreTxt!: Phaser.GameObjects.Text;
	private leaderboardContainers!: Array<any>;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		this.userScoreTxt.text=this.data.get("highscore");
		for (let index = 0; index < 5; index++) {
			const x=128;
			let y = 400 +(110*index);
			const leaderboardContainer = new leaderboardUserContainer(this, x, y)
			this.add.existing(leaderboardContainer);
			this.leaderboardContainers.push(leaderboardContainer);
			leaderboardContainer.lbRankTxt.text=index+1+".";
		}
		this.btn_exit.setInteractive();
	}
	gameOver(){
		this.scene.start('GameOver');
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
