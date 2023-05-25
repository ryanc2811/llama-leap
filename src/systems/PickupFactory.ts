import GameplayScript from "../script-nodes/GameplayScript";
import PickupItem from "../prefabs/PickupItem";
import PickupBehaviour from "../components/PickupBehaviour";
export class PickupFactory {
  constructor(private scene: Phaser.Scene, private gameManager:GameplayScript) {
  }

  create<T extends PickupBehaviour>(
    texture: string,
    behaviourClass: new (...args: any[]) => T
  ): PickupItem {
    const pickup = new PickupItem(this.scene, 0, 0, texture);
    this.configurePickup(pickup, texture, behaviourClass);
    return pickup;
  }

  configurePickup<T extends PickupBehaviour>(
    pickup: PickupItem,
    texture: string,
    behaviourClass: new (...args: any[]) => T
  ): void {
    pickup.setTexture(texture);
    const behaviour = new behaviourClass(pickup);
    behaviour.gameplayScript=this.gameManager;
    pickup.attachBehaviour(behaviour);
  }
}
