
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

		// gameplayScript
		new GameplayScript(this);

		// lists
		const enemies: Array<any> = [];

		// player (components)
		new Movement(player);

		this.player = player;
		this.enemyLayer = enemyLayer;
		this.enemies = enemies;

		this.events.emit("scene-awake");
	}

	private player!: Player;
	private enemyLayer!: Phaser.GameObjects.Layer;
	private enemies!: Array<any>;

	/* START-USER-CODE */

	create() {
		// Create a custom event
		this.events.once('gameOver', this.handleGameOver, this);

		this.editorCreate();
		// Start the enemy spawn loop
        this.spawnEnemyLoop();
		// Add overlap detection between the player and the enemies
		this.physics.add.overlap(this.player, this.enemies, this.playerVsEnemy, undefined, this);
		// Add overlap detection between the player and the enemies
		this.physics.add.overlap(this.enemies, this.enemies, this.enemyVsEnemy, undefined, this);
	}
	update(time: number, delta: number) {

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
	private removeEnemy(enemy :Enemy):void {
		this.enemyLayer.remove(enemy);
		this.enemies.splice(this.enemies.indexOf(enemy), 1);
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
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
