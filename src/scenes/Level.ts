
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Player from "../prefabs/Player";
import Movement from "../components/Movement";
import GameplayScript from "../script-nodes/GameplayScript";
/* START-USER-IMPORTS */
import OutOfBounds from "../components/OutOfBounds";
import Bird from "../prefabs/Bird";
import Pencil from "../prefabs/Pencil";
import Enemy from "../prefabs/Enemy";
import PickupItem from "../prefabs/PickupItem";
import CoinBehaviour from "../script-nodes/CoinBehaviour";
import PullToTarget from "../script-nodes/PullToTarget";
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// player
		const player = new Player(this, 385, 1164);
		this.add.existing(player);
		player.body.mass = 1;

		// enemyLayer
		const enemyLayer = this.add.layer();

		// uiLayer
		const uiLayer = this.add.layer();

		// scoreTxt
		const scoreTxt = this.add.text(89, 47, "", {});
		scoreTxt.text = "Score : 0";
		scoreTxt.setStyle({ "fontFamily": "Lato", "fontSize": "32px" });
		uiLayer.add(scoreTxt);

		// pickupsLayer
		const pickupsLayer = this.add.layer();

		// gameplayScript
		new GameplayScript(this);

		// lists
		const enemies: Array<any> = [];
		const pickups: Array<any> = [];

		// player (components)
		new Movement(player);

		this.player = player;
		this.enemyLayer = enemyLayer;
		this.scoreTxt = scoreTxt;
		this.pickupsLayer = pickupsLayer;
		this.enemies = enemies;
		this.pickups = pickups;

		this.events.emit("scene-awake");
	}

	private player!: Player;
	private enemyLayer!: Phaser.GameObjects.Layer;
	private scoreTxt!: Phaser.GameObjects.Text;
	private pickupsLayer!: Phaser.GameObjects.Layer;
	private enemies!: Array<any>;
	private pickups!: Array<any>;

	/* START-USER-CODE */

	private score:number=0;
	create() {
		// Create a custom event
		this.events.once('gameOver', this.handleGameOver, this);

		this.editorCreate();
		// Start the enemy spawn loop
        this.spawnEnemyLoop();
		this.spawnPickupsLoop();
		// Add overlap detection between the player and the enemies
		this.physics.add.overlap(this.player, this.enemies, this.playerVsEnemy, undefined, this);
		// Add overlap detection between the player and the enemies
		this.physics.add.overlap(this.enemies, this.enemies, this.enemyVsEnemy, undefined, this);

		this.physics.add.overlap(this.player, this.pickups, this.playerVsPickup, undefined, this);
		this.score=0;
		this.enemies.forEach(enemy=>this.removeEnemy(enemy));
		this.physics.world.createDebugGraphic();

	}
	update(time: number, delta: number) {
		this.updateScore(delta);
	}

	private updateScore(delta: number): void {

    // Increment the score based on the elapsed time
    this.score += delta * 0.01; // You can adjust the multiplier to control the rate at which the score increases
	this.scoreTxt.setText(`Score: ${Math.floor(this.score)}`);
}
	private handleEnemyOutOfBounds(enemy: Phaser.GameObjects.Sprite): void {
        // Remove the enemy from the scene
        enemy.destroy();
		this.removeEnemy(enemy as Enemy);
    }
	private playerVsEnemy(player: any, enemy: any): void {
		// Handle the collision between the player and the enemy here

		enemy.handleCollision(player);

	}
	private enemyVsEnemy(enemy1: any, enemy2: any): void {
		// Handle the collision between the player and the enemy here

		enemy1.handleCollision(enemy2);
		enemy2.handleCollision(enemy1);
	}
	private playerVsPickup(player: any, pickup: any): void {
		// Handle the collision between the player and the enemy here

		const pickupItem=pickup as PickupItem;
		pickupItem.onPickup(player);
	}
	private handleGameOver(): void {
		// Handle the game over logic here, for example:
		// - Stop the game loop
		// - Show a 'Game Over' screen
		// - Restart the level
		this.scene.start("MainMenu");
	}
	private spawnEnemyLoop(): void {
		// Calculate a random time interval for spawning enemies (in milliseconds)
		const minInterval = 1000;
		const maxInterval = 5000;
		const spawnInterval = Phaser.Math.Between(minInterval, maxInterval);

		// Create a timed event to spawn the next enemy
		this.time.addEvent({
			delay: spawnInterval,
			callback: () => {
				// Spawn the enemy and then start the next spawn loop
				this.spawnEnemy();
				this.spawnEnemyLoop();
			},
			callbackScope: this,
		});
	}
	private spawnPickupsLoop(): void {
		// Calculate a random time interval for spawning pickups (in milliseconds)
		const minInterval = 1000;
		const maxInterval = 5000;
		const spawnInterval = Phaser.Math.Between(minInterval, maxInterval);

		// Create a timed event to spawn the next pickup
		this.time.addEvent({
			delay: spawnInterval,
			callback: () => {
				// Spawn the pickup and then start the next spawn loop
				this.spawnPickup();
				this.spawnPickupsLoop();
			},
			callbackScope: this,
		});
	}
	private removeEnemy(enemy :Enemy):void {
		this.enemyLayer.remove(enemy);
		this.enemies.splice(this.enemies.indexOf(enemy), 1);
	}
	private removePickup(pickup :PickupItem):void {
		this.pickupsLayer.remove(pickup);
		this.pickups.splice(this.enemies.indexOf(pickup), 1);
	}
	private spawnEnemy(): void {
			// Randomly choose an enemy type
			const enemyTypes = [Bird, Pencil];
			const enemyType = Phaser.Utils.Array.GetRandom(enemyTypes);

			// Calculate a random Y position within the screen bounds
			const minY = 100;
			const maxY = this.scale.height - 100;
			const randomY = Phaser.Math.Between(minY, maxY);

			// Spawn the enemy outside the right of the screen
			const enemy = new enemyType(this, this.scale.width + 100, randomY);
			this.add.existing(enemy);

			// Attach the OutOfBounds component and listen for the 'outOfBounds' event
			new OutOfBounds(enemy);
			enemy.once('outOfBounds', this.handleEnemyOutOfBounds, this);
			this.enemyLayer.add(enemy);
			enemy.once('destroyed', (destroyedEnemy: Enemy) => {
				this.removeEnemy(destroyedEnemy);
			});
			// Add the enemy to the enemies array
			this.enemies.push(enemy);
		}

		private spawnPickup(): void {
			// Randomly choose an enemy type
			const pickupTypes = ['coin'];
			const pickupType = Phaser.Utils.Array.GetRandom(pickupTypes);

			// Calculate a random Y position within the screen bounds
			const minY = 100;
			const maxY = this.scale.height - 100;
			const randomY = Phaser.Math.Between(minY, maxY);

			// Spawn the enemy outside the right of the screen
			const pickup = new PickupItem(this, this.scale.width + 100, randomY,pickupType);
			this.add.existing(pickup);
			// Attach the OutOfBounds component and listen for the 'outOfBounds' event
			new OutOfBounds(pickup);
			const pullToTarget = new PullToTarget(pickup);
			pullToTarget.target=this.player;
			pickup.once('outOfBounds', this.handleEnemyOutOfBounds, this);
			this.pickupsLayer.add(pickup);
			pickup.once('destroyed', (destroyedPickup: PickupItem) => {
				this.removePickup(destroyedPickup);
			});
			// Add the enemy to the enemies array
			this.pickups.push(pickup);

			switch(pickupType){
				case'coin':
				const behavior = new CoinBehaviour(pickup);
				pickup.attachBehaviour(behavior);
			}



		}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
