import Phaser from "phaser";

import Player from "../prefabs/Player";


export default class EntitySpawner {
  private scene: Phaser.Scene;

  private baseDifficulty: number;
  private difficulty: number=0;
  private entityData: Map<any, any>=new Map();
  private timeSinceLastDifficultyIncrease: number=0;
  private difficultyIncreaseInterval: number=0;
  private difficultyIncreaseAmount: number=0;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.baseDifficulty = 1;

    this.init();
  }

  init() {
    this.difficulty = this.baseDifficulty;
    this.entityData = new Map();
    //this.entityData.set(Bird, { maxSize: 10, entities: new Set(), spawnChance: 0.005 });
   // this.entityData.set(Coin, { maxSize: 20, entities: new Set(), spawnChance: 0.001 });
    this.entityData.set(Player, { maxSize: 1, entities: new Set() });
    this.timeSinceLastDifficultyIncrease = 0;
    this.difficultyIncreaseInterval = 1000;
    this.difficultyIncreaseAmount = 0.1;
  }

  add(cls: any, entity: any) {
    const data = this.entityData.get(cls);
    if (data && data.entities.size < data.maxSize) {
      data.entities.add(entity);
      // Add the entity to the scene
      this.scene.add.existing(entity);

    }
  }

  remove(cls: any, entity: any) {
    const data = this.entityData.get(cls);
    if (data && data.entities.has(entity)) {
      // Remove the entity from the scene
      entity.destroy();
      data.entities.delete(entity);
    }
  }

  update(delta: number) {
    // Iterate through all entity classes (Bird, Coin) in the entityData map
    for (const cls of this.entityData.keys()) {
      const data = this.entityData.get(cls);
      // Iterate through all entities of the current class
      for (const entity of data.entities) {
        entity.update(delta);
      }
    }

    this.updateDifficulty(delta);

    /* if (Math.random() < this.entityData.get(Coin).spawnChance) {
      this.spawnCoin();
    } */

    /* if (Math.random() < this.calculateEnemySpawnRate("bird")) {
      this.spawnEnemy("bird");
    } */
  }

  updateDifficulty(delta: number) {
    this.timeSinceLastDifficultyIncrease += delta;
    if (this.timeSinceLastDifficultyIncrease >= this.difficultyIncreaseInterval) {
      this.difficulty += this.difficultyIncreaseAmount;
      this.timeSinceLastDifficultyIncrease -= this.difficultyIncreaseInterval;
    }
  }

 /*  calculateEnemySpawnRate(type: string) {
    if (type === "bird") {
      return this.entityData.get(Bird).spawnChance * this.difficulty;
    }
  }

  spawnEnemy(type: string) {
    if (type === "bird") {
      const x = this.scene.cameras.main.width;
      const y = Math.random() * (this.scene.cameras.main.height - 50) + 25;

      const entity = new Bird(this.scene, x, y);

      entity.on("destroy", () => this.remove(Bird, entity);
      });

      this.add(Bird, entity);
    }
  }

  spawnCoin() {
    const x = this.scene.cameras.main.width;
    const y = Math.random() * (this.scene.cameras.main.height - 50) + 25;

    const entity = new Coin(this.scene, x, y, this.scoreManager);

    entity.on('destroy', () => {
      this.remove(Coin, entity);
    });

    this.add(Coin, entity);
  }
 */
  spawnPlayer(x: number, y: number): Player {
    const entity = new Player(this.scene, x, y);
    this.add(Player, entity);
    return entity;
  }
}
