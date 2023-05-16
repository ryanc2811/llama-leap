
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class GameplayScript extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */


		this.scene.events.on("game-paused", this.togglePause, this);
		this.scene.events.on(Phaser.Scenes.Events.SHUTDOWN, () => this.scene.events.off("game-paused", this.togglePause, this));

		this.scene.time.paused = false;
		this.scene.physics.world.isPaused = false;


		/* END-USER-CTR-CODE */
	}

	public scoreTxt!: Phaser.GameObjects.Text;
	public highScoreTxt!: Phaser.GameObjects.Text;

	/* START-USER-CODE */
	private score:number=0;
	private togglePause() {

		this.setPaused(!this.isPaused());
	}

	private isPaused() {

		return this.scene.time.paused;
	}

	private setPaused(paused: boolean) {

		this.scene.time.paused = paused;
		this.scene.physics.world.isPaused = paused;
	}


	public updateGameplay(time:number, delta: number) {

		if (this.isPaused()) {

			return;
		}

		this.updateScore(delta);

	}

	public saveHighScore(score:number) {
		// Convert the score to a string before storing it
		const scoreString = score.toString();

		// Save the score to localStorage with the key 'highScore'
		localStorage.setItem('highScore', scoreString);
	}
	public getHighScore(): number {
	// Get the high score from localStorage with the key 'highScore'
	const highScoreString = localStorage.getItem('highScore');
	
	// If there is no high score saved, return 0
	if (!highScoreString) {
		return 0;
	}

	// Convert the high score string to a number and return it
	return parseInt(highScoreString, 10);
	}

	public getScore(){
		return Math.floor(this.score);
	}
	public updateHighScore() {
		// Get the current high score
		const currentHighScore = this.getHighScore();
		this.highScoreTxt.setText(`High Score: ${Math.floor(currentHighScore)}`);
		// Check if the new score is higher than the current high score
		if (this.score > currentHighScore) {
			// If it is, save the new score as the high score
			this.saveHighScore(this.score);
		}
	}

	private updateScore(delta: number): void {

		// Increment the score based on the elapsed time
		this.score += delta * 0.01; // You can adjust the multiplier to control the rate at which the score increases
		this.scoreTxt.setText(`Score: ${Math.floor(this.score)}`);
	}
	protected start(): void {
		this.score=0;
	}
	public increaseScore(increaseValue:number){
		this.score+=increaseValue;
		this.scoreTxt.setText(`Score: ${Math.floor(this.score)}`);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
