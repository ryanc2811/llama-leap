
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import OnPointerDownScript from "../script-nodes-basic/OnPointerDownScript";
import StartSceneActionScript from "../script-nodes-basic/StartSceneActionScript";
/* START-USER-IMPORTS */
import registerRoundedRectangleGraphicsFactory from "../roundedRectangle/registerRoundedRectangleGraphicsFactory";


/* END-USER-IMPORTS */

export default class GameOver extends Phaser.Scene {

	constructor() {
		super("GameOver");

		/* START-USER-CTR-CODE */
		registerRoundedRectangleGraphicsFactory();
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

		// highScoreLayer
		const highScoreLayer = this.add.layer();

		// highscoreBox
		const highscoreBox = this.add.roundedRectangleGraphics(360, 784, 360, 154);
		highscoreBox.fillColor = 16750487;
		highscoreBox.strokeColor = 16777215;
		highscoreBox.lineWidth = 3;
		highscoreBox.radiusTopLeft = 8;
		highscoreBox.radiusTopRight = 8;
		highscoreBox.radiusBottomLeft = 8;
		highscoreBox.radiusBottomRight = 8;
		highscoreBox.shadowAlpha = 0.3;
		highscoreBox.shadowOffsetLeft = 6;
		highscoreBox.shadowOffsetRight = 2;
		highscoreBox.shadowOffsetBottom = 5;
		highScoreLayer.add(highscoreBox);

		// highscoreTitle
		const highscoreTitle = this.add.text(208, 800, "", {});
		highscoreTitle.text = "Highscore";
		highscoreTitle.setStyle({ "fontFamily": "Lato", "fontSize": "24px" });
		highScoreLayer.add(highscoreTitle);

		// highscoreTxt
		const highscoreTxt = this.add.text(208, 752, "", {});
		highscoreTxt.text = "30000\n";
		highscoreTxt.setStyle({ "fixedWidth":150,"fontFamily": "Lato", "fontSize": "40px", "fontStyle": "bold" });
		highscoreTxt.setWordWrapWidth(150, true);
		highScoreLayer.add(highscoreTxt);

		// image_1
		const image_1 = this.add.image(464, 784, "shield");
		image_1.scaleX = 0.4;
		image_1.scaleY = 0.4;
		image_1.tintTopLeft = 16777215;
		image_1.tintTopRight = 16777215;
		image_1.tintBottomLeft = 16777215;
		image_1.tintBottomRight = 16777215;
		highScoreLayer.add(image_1);

		// rankLayer
		const rankLayer = this.add.layer();

		// rankBox
		const rankBox = this.add.roundedRectangleGraphics(360, 592, 360, 154);
		rankBox.fillColor = 16770664;
		rankBox.strokeColor = 16777215;
		rankBox.lineWidth = 3;
		rankBox.radiusTopLeft = 8;
		rankBox.radiusTopRight = 8;
		rankBox.radiusBottomLeft = 8;
		rankBox.radiusBottomRight = 8;
		rankBox.shadowAlpha = 0.3;
		rankBox.shadowOffsetLeft = 6;
		rankBox.shadowOffsetRight = 2;
		rankBox.shadowOffsetBottom = 5;
		rankLayer.add(rankBox);

		// rankTitle
		const rankTitle = this.add.text(208, 608, "", {});
		rankTitle.text = "Rank";
		rankTitle.setStyle({ "color": "#212F60", "fontFamily": "Lato", "fontSize": "24px" });
		rankLayer.add(rankTitle);

		// rankTxt
		const rankTxt = this.add.text(208, 560, "", {});
		rankTxt.text = "#30000";
		rankTxt.setStyle({ "color": "#212F60", "fixedWidth":150,"fontFamily": "Lato", "fontSize": "40px", "fontStyle": "bold" });
		rankTxt.setWordWrapWidth(150, true);
		rankLayer.add(rankTxt);

		// bird
		const bird = this.add.image(464, 592, "birds", 4);
		bird.scaleX = 0.3;
		bird.scaleY = 0.3;
		bird.tintTopLeft = 16777215;
		bird.tintTopRight = 16777215;
		bird.tintBottomLeft = 16777215;
		bird.tintBottomRight = 16777215;
		rankLayer.add(bird);

		// scoreLayer
		const scoreLayer = this.add.layer();

		// scoreBox
		const scoreBox = this.add.roundedRectangleGraphics(360, 352, 500, 250);
		scoreBox.fillColor = 4492280;
		scoreBox.strokeColor = 16777215;
		scoreBox.lineWidth = 8;
		scoreBox.radiusTopLeft = 8;
		scoreBox.radiusTopRight = 8;
		scoreBox.radiusBottomLeft = 8;
		scoreBox.radiusBottomRight = 8;
		scoreBox.shadowAlpha = 0.3;
		scoreBox.shadowOffsetLeft = 6;
		scoreBox.shadowOffsetRight = 2;
		scoreBox.shadowOffsetBottom = 5;
		scoreLayer.add(scoreBox);

		// scoreTitle
		const scoreTitle = this.add.text(156, 400, "", {});
		scoreTitle.text = "Score";
		scoreTitle.setStyle({ "align": "center", "fontFamily": "Lato", "fontSize": "32px" });
		scoreLayer.add(scoreTitle);

		// scoreTxt
		const scoreTxt = this.add.text(156, 336, "", {});
		scoreTxt.text = "30000";
		scoreTxt.setStyle({ "color": "#ffff", "fontFamily": "Lato", "fontSize": "52px", "fontStyle": "bold" });
		scoreLayer.add(scoreTxt);

		// coin
		const coin = this.add.image(492, 352, "coin");
		coin.scaleX = 0.7;
		coin.scaleY = 0.7;
		coin.tintTopLeft = 16777215;
		coin.tintTopRight = 16777215;
		coin.tintBottomLeft = 16777215;
		coin.tintBottomRight = 16777215;
		scoreLayer.add(coin);

		// gameOverTxt
		const gameOverTxt = this.add.text(360, 144, "", {});
		gameOverTxt.setOrigin(0.5, 0.5);
		gameOverTxt.text = "GAME OVER!";
		gameOverTxt.setStyle({ "align": "center", "color": "#212F60", "fontFamily": "Lato", "fontSize": "72px", "fontStyle": "bold" });

		// btn_retry
		const btn_retry = this.add.roundedRectangleGraphics(360, 1074, 250, 100);
		btn_retry.fillColor = 4492280;
		btn_retry.isStroked = false;
		btn_retry.strokeColor = 16777215;
		btn_retry.lineWidth = 3;
		btn_retry.radiusTopLeft = 30;
		btn_retry.radiusTopRight = 30;
		btn_retry.radiusBottomLeft = 30;
		btn_retry.radiusBottomRight = 30;
		btn_retry.shadowOffsetLeft = 6;
		btn_retry.shadowOffsetRight = 2;
		btn_retry.shadowOffsetBottom = 5;

		// onPointerDownScript
		const onPointerDownScript = new OnPointerDownScript(btn_retry);

		// startSceneActionScript
		const startSceneActionScript = new StartSceneActionScript(onPointerDownScript);

		// retryTxt
		const retryTxt = this.add.text(284, 1056, "", {});
		retryTxt.text = "Play";
		retryTxt.setStyle({ "fontFamily": "Lato", "fontSize": "32px" });

		// ellipse_1
		const ellipse_1 = this.add.ellipse(428, 1072, 40, 40);
		ellipse_1.isStroked = true;
		ellipse_1.lineWidth = 3;

		// triangle_1
		const triangle_1 = this.add.triangle(428, 1072, 0, 8, 8, 0, 16, 8);
		triangle_1.angle = 90;
		triangle_1.isStroked = true;
		triangle_1.lineWidth = 3;

		// btn_leaderboard
		const btn_leaderboard = this.add.roundedRectangleGraphics(360, 944, 360, 100);
		btn_leaderboard.isFilled = false;
		btn_leaderboard.fillColor = 12750584;
		btn_leaderboard.strokeColor = 4492280;
		btn_leaderboard.lineWidth = 3;
		btn_leaderboard.radiusTopLeft = 30;
		btn_leaderboard.radiusTopRight = 30;
		btn_leaderboard.radiusBottomLeft = 30;
		btn_leaderboard.radiusBottomRight = 30;
		btn_leaderboard.shadowOffsetLeft = 6;
		btn_leaderboard.shadowOffsetRight = 2;
		btn_leaderboard.shadowOffsetBottom = 5;

		// leaderboardTxt
		const leaderboardTxt = this.add.text(360, 944, "", {});
		leaderboardTxt.setOrigin(0.5, 0.5);
		leaderboardTxt.text = "Leaderboard";
		leaderboardTxt.setStyle({ "align": "center", "color": "#448BF8", "fontFamily": "Lato", "fontSize": "32px" });

		// startSceneActionScript (prefab fields)
		startSceneActionScript.sceneKey = "Level";

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here



