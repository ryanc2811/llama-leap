
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Player from "../prefabs/Player";
import Movement from "../components/Movement";
import Magnetism from "../components/Magnetism";
import ShieldComponent from "../components/ShieldComponent";
import GameplayScript from "../script-nodes/GameplayScript";
/* START-USER-IMPORTS */
import OutOfBounds from "../components/OutOfBounds";
import Bird from "../prefabs/Bird";
import Pencil from "../prefabs/Pencil";
import Enemy from "../prefabs/Enemy";
import PickupItem from "../prefabs/PickupItem";
import CoinBehaviour from "../components/CoinBehaviour";
import { GameObjectPool } from "../systems/GameObjectPool";
import { PickupFactory } from "../systems/PickupFactory";
import DoublePointsBehaviour from "../components/DoublePointsBehaviour";
import registerRoundedRectangleGraphicsFactory from "../roundedRectangle/registerRoundedRectangleGraphicsFactory";
import MagnetBehaviour from "../components/MagnetBehaviour";
import ShieldBehaviour from "../components/ShieldBehaviour";
import ShrinkBehaviour from "../components/ShrinkBehaviour";
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		registerRoundedRectangleGraphicsFactory();
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// background
		const background = this.add.layer();

		// backgroundImg
		const backgroundImg = this.add.image(0, 0, "background");
		backgroundImg.setOrigin(0, 0);
		background.add(backgroundImg);

		// enemyLayer
		const enemyLayer = this.add.layer();

		// player
		const player = new Player(this, 385, 1164);
		this.add.existing(player);
		player.body.mass = 1;
		player.body.collideWorldBounds = true;

		// pickupsLayer
		const pickupsLayer = this.add.layer();

		// uiLayer
		const uiLayer = this.add.layer();

		// highScoreTxt
		const highScoreTxt = this.add.text(430, 47, "", {});
		highScoreTxt.text = "High Score : 0";
		highScoreTxt.setStyle({ "color": "#2a2626ff", "fontFamily": "Lato", "fontSize": "32px" });
		uiLayer.add(highScoreTxt);

		// topbar
		const topbar = this.add.image(-16, -16, "top-bar");
		topbar.setOrigin(0, 0);
		uiLayer.add(topbar);

		// roundedrectanglegraphics_1
		const roundedrectanglegraphics_1 = this.add.roundedRectangleGraphics(188, 60, 250, 50);
		roundedrectanglegraphics_1.isStroked = false;
		uiLayer.add(roundedrectanglegraphics_1);

		// coinplus
		const coinplus = this.add.sprite(296, 60, "plus_atlas", "plus-1.png");
		uiLayer.add(coinplus);

		// coin-topbar
		const coin_topbar = this.add.image(68, 64, "coin-top-bar");
		uiLayer.add(coin_topbar);

		// scoreTxt
		const scoreTxt = this.add.text(114, 41, "", {});
		scoreTxt.text = "99999999";
		scoreTxt.setStyle({ "color": "#212F60", "fontFamily": "Lato", "fontSize": "32px", "fontStyle": "bold", "strokeThickness":2});
		uiLayer.add(scoreTxt);

		// powerupTimerLayer
		const powerupTimerLayer = this.add.container(0, 0);
		uiLayer.add(powerupTimerLayer);

		// powerupImageLayer
		const powerupImageLayer = this.add.container(0, 0);
		uiLayer.add(powerupImageLayer);

		// powerupSlot1
		const powerupSlot1 = this.add.image(400, 60, "double_points_ui");
		powerupImageLayer.add(powerupSlot1);

		// powerupSlot2
		const powerupSlot2 = this.add.image(480, 60, "shield_ui");
		powerupImageLayer.add(powerupSlot2);

		// powerupSlot3
		const powerupSlot3 = this.add.image(560, 60, "magnet_ui");
		powerupImageLayer.add(powerupSlot3);

		// powerupSlot4
		const powerupSlot4 = this.add.image(640, 60, "shrink_ui");
		powerupImageLayer.add(powerupSlot4);

		// gameplayScript
		const gameplayScript = new GameplayScript(this);

		// playerVsEnemy
		this.physics.add.overlap(player, enemyLayer.getChildren(), this.playerVsEnemy, undefined, this);

		// playerVsPickup
		this.physics.add.overlap(player, pickupsLayer.getChildren(), this.playerVsPickup, undefined, this);

		// enemyVsEnemy
		this.physics.add.overlap(enemyLayer.getChildren(), enemyLayer.getChildren(), this.enemyVsEnemy, undefined, this);

		// player (components)
		new Movement(player);
		new Magnetism(player);
		new ShieldComponent(player);

		// gameplayScript (prefab fields)
		gameplayScript.scoreTxt = scoreTxt;
		gameplayScript.highScoreTxt = highScoreTxt;
		gameplayScript.doublePointsSlot = powerupSlot1;
		gameplayScript.powerupTimerLayer = powerupTimerLayer;
		gameplayScript.player = player;
		gameplayScript.magnetSlot = powerupSlot3;
		gameplayScript.shieldSlot = powerupSlot2;
		gameplayScript.shrinkSlot = powerupSlot4;
		gameplayScript.coinplus = coinplus;

		this.enemyLayer = enemyLayer;
		this.player = player;
		this.pickupsLayer = pickupsLayer;
		this.uiLayer = uiLayer;
		this.gameplayScript = gameplayScript;

		this.events.emit("scene-awake");
	}

	private enemyLayer!: Phaser.GameObjects.Layer;
	private player!: Player;
	private pickupsLayer!: Phaser.GameObjects.Layer;
	private uiLayer!: Phaser.GameObjects.Layer;
	private gameplayScript!: GameplayScript;

	/* START-USER-CODE */

	private pickupPool!:GameObjectPool<PickupItem>;
	private enemyPools!: Array<GameObjectPool<Enemy>>;
	private topBarHeight:number =115;

	create() {
		// Create a custom event
		this.events.once('gameOver', this.handleGameOver, this);
		this.physics.world.setBounds(0, this.topBarHeight, this.scale.width, this.scale.height - this.topBarHeight);

		this.editorCreate();
		// Start the enemy spawn loop
        this.spawnEnemyLoop();
		this.spawnPickupsLoop();
		this.spawnCoinsLoop();

		this.gameplayScript.updateHighScore();
		//.enemies.forEach(enemy=>this.removeEnemy(enemy));
		//this.pickups.forEach(pickup=>this.removePickup(pickup));
		//this.physics.world.createDebugGraphic();
		this.pickupPool = new GameObjectPool(
		this,
		() => {
			const pickupFactory = new PickupFactory(this,this.gameplayScript);
			const pickup = pickupFactory.create('coin', CoinBehaviour);

			return pickup;
		},
		PickupItem
		);


		// In your scene's create method
		this.enemyPools = [
			new GameObjectPool<Bird>(this, () => new Bird(this, 0, 0), Bird),
			new GameObjectPool<Pencil>(this, () => new Pencil(this, 0,0), Pencil)
		  ];

		Magnetism.getComponent(this.player).pickupsLayer=this.pickupsLayer;
	}
	update(time: number, delta: number) {
		this.gameplayScript.updateGameplay(time,delta);

	}
	private playerVsEnemy(player: any, enemy: any): void {
		// Handle the collision between the player and the enemy here

		enemy.handleCollision(player);
		this.gameplayScript.deactivateShield();

	}
	private enemyVsEnemy(enemy1: any, enemy2: any): void {
		// Handle the collision between the player and the enemy here

		enemy1.handleCollision(enemy2);
		enemy2.handleCollision(enemy1);
	}
	private playerVsPickup(player: any, pickup: any): void {
		console.log('playerVsPickup called with:', player, pickup);
		// Make sure the objects are still active before handling the collision
		if (player.active && pickup.active) {
			const pickupItem = pickup as PickupItem;

        	pickupItem.onPickup(player);
		}
	}
	private handleGameOver(): void {
		// Handle the game over logic here, for example:
		// - Stop the game loop
		// - Show a 'Game Over' screen
		// - Update highscore
		this.gameplayScript.updateHighScore();
		// - Restart the level
		this.scene.start("GameOver");
		this.scene.get("GameOver").data.set("score", this.gameplayScript.getScore());
		this.scene.get("GameOver").data.set("highscore", this.gameplayScript.getHighScore());
	}
	private spawnEnemyLoop(): void {
		// Calculate a random time interval for spawning enemies (in milliseconds)
		const minInterval = 1000;
		const maxInterval = 3000;
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
	private spawnCoinsLoop(): void {
		// Calculate a random time interval for spawning pickups (in milliseconds)
		const minInterval = 1000;
		const maxInterval = 3000;
		const spawnInterval = Phaser.Math.Between(minInterval, maxInterval);

		// Create a timed event to spawn the next pickup
		this.time.addEvent({
			delay: spawnInterval,
			callback: () => {
				// Spawn the pickup and then start the next spawn loop
				this.spawnCoin();
				this.spawnCoinsLoop();
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
	  private handleObjectDestroyed(destroyedObject: Phaser.GameObjects.Sprite): void {
		// Disable and hide the object
		destroyedObject.setActive(false);
		destroyedObject.setVisible(false);

		// Remove any active physics bodies or colliders
		if (destroyedObject.body instanceof Phaser.Physics.Arcade.Body || destroyedObject.body instanceof Phaser.Physics.Arcade.StaticBody) {
			this.physics.world.disableBody(destroyedObject.body);
		}
		destroyedObject.off('outOfBounds', this.handleObjectDestroyed, this);
		// Return the object to the appropriate pool
		if (destroyedObject instanceof Enemy) {
			const enemy = destroyedObject as Enemy;
			// Find the correct pool and release the enemy
			const pool = this.enemyPools.find(pool => enemy instanceof pool.type);
			if (pool) {
				pool.release(enemy);
			}
			enemy.reset();
			this.enemyLayer.remove(enemy);
		} else if (destroyedObject instanceof PickupItem) {
			const pickup = destroyedObject as PickupItem;
			this.pickupPool.release(pickup);
			pickup.reset();
			this.pickupsLayer.remove(pickup);

		}
	}

	private spawnEnemy(): void {
		// Randomly choose a pool
		const enemyPool = Phaser.Utils.Array.GetRandom(this.enemyPools);

		// Calculate a random Y position within the screen bounds
		const minY = this.topBarHeight+(this.player.body.height/2);
		const maxY = this.scale.height - 100;
		const randomY = Phaser.Math.Between(minY, maxY);

		// Get an enemy from the pool and configure it
		const enemy = enemyPool.get();
		if(this.enemyLayer.list.includes(enemy)){
			return;
		}
		enemy.setPosition(this.scale.width+100, randomY);
		enemy.setActive(true);
		enemy.setVisible(true);
		this.physics.world.enable(enemy);
		enemy.setSpeed(Phaser.Math.Between(-350,-100));
		// Check if the enemy already has an OutOfBounds component, if not create a new one
		let outOfBounds = OutOfBounds.getComponent(enemy);
		if (!outOfBounds) {
			outOfBounds = new OutOfBounds(enemy);
		} else {
			// If the enemy already has an OutOfBounds component, reset it
			outOfBounds.reset();
		}

		enemy.once('outOfBounds', this.handleObjectDestroyed, this);
		enemy.once('destroyed', (destroyedEnemy: Enemy) => {
			this.handleObjectDestroyed(destroyedEnemy);
		});

		// Add the enemy to the scene
		//this.add.existing(enemy);
		// Add the enemy to the enemies array
		this.enemyLayer.add(enemy);
	}

	private spawnCoin():void{
		const texture='coin';
		const behaviour=CoinBehaviour;

		 // Calculate a random Y position within the screen bounds
    const minY = this.topBarHeight+(this.player.body.height/2);
    const maxY = this.scale.height - 100;
    const randomY = Phaser.Math.Between(minY, maxY);

    // Get a pickup from the pool and configure it
    const pickup = this.pickupPool.get() as PickupItem;
	if(this.pickupsLayer.list.includes(pickup)){
			return;
		}
    const pickupFactory = new PickupFactory(this, this.gameplayScript);
    pickupFactory.configurePickup(pickup, texture, behaviour);
    pickup.setPosition(this.scale.width + 100, randomY);
    pickup.setActive(true);
    pickup.setVisible(true);
	pickup.pickupType=pickup.texture.key;
    this.physics.world.enable(pickup);
    pickup.setSpeed(Phaser.Math.Between(-400, -50));

    // Attach the OutOfBounds component and listen for the 'outOfBounds' event
    new OutOfBounds(pickup);

    // Check if the enemy already has an OutOfBounds component, if not create a new one
    let outOfBounds = OutOfBounds.getComponent(pickup);
    if (!outOfBounds) {
        outOfBounds = new OutOfBounds(pickup);
    } else {
        // If the enemy already has an OutOfBounds component, reset it
        outOfBounds.reset();
    }

    pickup.once('outOfBounds', this.handleObjectDestroyed, this);
    pickup.once('destroyed', (destroyedPickup: PickupItem) => {
        this.handleObjectDestroyed(destroyedPickup);
    });

    // Add the pickup to the scene
    //this.add.existing(pickup);

    // Add the enemy to the pickups array
    this.pickupsLayer.add(pickup);
}

	private spawnPickup(): void {
    // Randomly choose a pickup type
    const pickupTypes = [
        { texture: 'double_points', behaviour: DoublePointsBehaviour },
		{ texture: 'magnet', behaviour: MagnetBehaviour },
		{ texture: 'shield', behaviour: ShieldBehaviour },
		{ texture: 'shrink', behaviour: ShrinkBehaviour },
    ];
    const { texture, behaviour} = Phaser.Utils.Array.GetRandom(pickupTypes);

    // Calculate a random Y position within the screen bounds
    const minY = this.topBarHeight+(this.player.body.height/2);
    const maxY = this.scale.height - 100;
    const randomY = Phaser.Math.Between(minY, maxY);

    // Get a pickup from the pool and configure it
    const pickup = this.pickupPool.get() as PickupItem;
	if(this.pickupsLayer.list.includes(pickup)){
			return;
		}
    const pickupFactory = new PickupFactory(this, this.gameplayScript);
    pickupFactory.configurePickup(pickup, texture, behaviour);
    pickup.setPosition(this.scale.width + 100, randomY);
    pickup.setActive(true);
    pickup.setVisible(true);
	pickup.pickupType=pickup.texture.key;
    this.physics.world.enable(pickup);
    pickup.setSpeed(Phaser.Math.Between(-400, -50));

    // Attach the OutOfBounds component and listen for the 'outOfBounds' event
    new OutOfBounds(pickup);

    // Check if the enemy already has an OutOfBounds component, if not create a new one
    let outOfBounds = OutOfBounds.getComponent(pickup);
    if (!outOfBounds) {
        outOfBounds = new OutOfBounds(pickup);
    } else {
        // If the enemy already has an OutOfBounds component, reset it
        outOfBounds.reset();
    }

    pickup.once('outOfBounds', this.handleObjectDestroyed, this);
    pickup.once('destroyed', (destroyedPickup: PickupItem) => {
        this.handleObjectDestroyed(destroyedPickup);
    });

    // Add the pickup to the scene
    //this.add.existing(pickup);

    // Add the enemy to the pickups array
    this.pickupsLayer.add(pickup);
}



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
