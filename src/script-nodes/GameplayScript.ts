
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import CircularTimer from "../prefabs/CircularTimer";
import Player from "../prefabs/Player";
import Magnetism from "../components/Magnetism";
import ShieldComponent from "../components/ShieldComponent";
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
	public doublePointsSlot!: Phaser.GameObjects.Image;
	public powerupTimerLayer!: Phaser.GameObjects.Container;
	public player!: Player;
	public magnetSlot!: Phaser.GameObjects.Image;
	public shieldSlot!: Phaser.GameObjects.Image;
	public shrinkSlot!: Phaser.GameObjects.Image;
	public coinplus!: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */
	private score:number=0;
	private doublePoints:boolean=false;
	private doublePointsTimer?: CircularTimer;
	private doublePointsLength:number=7000;

	private magnetTimer?: CircularTimer;
	private magnetLength:number=5000;

	private shieldTimer?: CircularTimer;
	private shieldLength:number=5000;

	private shrinkTimer?: CircularTimer;
	private shrinkLength:number=10000;


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
	public getDoublePointsState(){
		return this.doublePoints;
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
	public activateShrink(){
		if (this.shrinkTimer) {
                this.shrinkTimer.stop();
                this.shrinkTimer.removeFromUpdateList();
                this.shrinkTimer.destroy();
            }
		this.player.shrink();
		const radius = Math.min(this.shrinkSlot.width, this.shrinkSlot.height) / 2
		this.shrinkTimer  = new CircularTimer(this.scene, this.shrinkSlot.x, this.shrinkSlot.y, radius, () => {this.player.expand() } );

        this.powerupTimerLayer.add(this.shrinkTimer);
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.shrinkTimer.update, this.shrinkTimer)
        this.shrinkTimer.start(this.shrinkLength);
	}
	public activateShield(){
		// If a timer is already active, cancel it
		this.deactivateShield();

		ShieldComponent.getComponent(this.player).setShieldActive(true);
		const radius = Math.min(this.shieldSlot.width, this.shieldSlot.height) / 2
		this.shieldTimer  = new CircularTimer(this.scene, this.shieldSlot.x, this.shieldSlot.y, radius, () => {ShieldComponent.getComponent(this.player).setShieldActive(false) } );

        this.powerupTimerLayer.add(this.shieldTimer);
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.shieldTimer.update, this.shieldTimer)
        this.shieldTimer.start(this.shieldLength);
	}
	public deactivateShield(){
		if (this.shieldTimer) {
                this.shieldTimer.stop();
                this.shieldTimer.removeFromUpdateList();
                this.shieldTimer.destroy();
            }
	}
	public activateMagnet(){
		// If a timer is already active, cancel it
		if (this.magnetTimer) {
                this.magnetTimer.stop();
                this.magnetTimer.removeFromUpdateList();
                this.magnetTimer.destroy();
            }


		Magnetism.getComponent(this.player).setMagnetism(1000,500);
		const radius = Math.min(this.magnetSlot.width, this.magnetSlot.height) / 2
		this.magnetTimer  = new CircularTimer(this.scene, this.magnetSlot.x, this.magnetSlot.y, radius, () => {Magnetism.getComponent(this.player).resetMagnetism() } );

        this.powerupTimerLayer.add(this.magnetTimer);
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.magnetTimer.update, this.magnetTimer)
        this.magnetTimer.start(this.magnetLength);
	}
	public activateDoublePoints(){

		// If a timer is already active, cancel it
		if (this.doublePointsTimer) {
                this.doublePointsTimer.stop();
                this.doublePointsTimer.removeFromUpdateList();
                this.doublePointsTimer.destroy();
            }

		this.doublePoints = true;
		const radius = Math.min(this.doublePointsSlot.width, this.doublePointsSlot.height) / 2
		this.doublePointsTimer  = new CircularTimer(this.scene, this.doublePointsSlot.x, this.doublePointsSlot.y, radius, () => { this.doublePoints = false; } );

        this.powerupTimerLayer.add(this.doublePointsTimer);
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.doublePointsTimer.update, this.doublePointsTimer)
        this.doublePointsTimer.start(this.doublePointsLength);

	}
	private updateScore(delta: number): void {

		// Increment the score based on the elapsed time
		this.score += delta * 0.01; 
		if(this.doublePoints){
			this.score+=delta*0.01;
		}
		this.scoreTxt.setText(`${Math.floor(this.score)}`);
	}
	protected start(): void {
		this.score=0;
	}
	public increaseScore(increaseValue:number){
		if(this.doublePoints){
			this.score+=increaseValue*2;
		}else{
			this.score+=increaseValue;
		}
		this.coinplus.play('coin-plus');
		this.scoreTxt.setText(`Score: ${Math.floor(this.score)}`);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
