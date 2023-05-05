export class GameObjectPool<T extends Phaser.GameObjects.Sprite> {
    private pool: T[];
    public type: new (...args: any[]) => T;
    private createObject: () => T;
  
    constructor(private scene: Phaser.Scene, createObject: () => T, type: new (...args: any[]) => T) {
      this.pool = [];
      this.createObject = createObject;
      this.type = type;
    }
  
    get(): T {
      if (this.pool.length > 0) {
        return this.pool.pop() as T;
      } else {
        return this.createObject();
      }
    }
  
    release(gameObject: T): void {
      this.pool.push(gameObject);
    }
  }
  