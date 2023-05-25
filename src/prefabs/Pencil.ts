// You can write more code here

/* START OF COMPILED CODE */

import Enemy from "./Enemy";
/* START-USER-IMPORTS */
import Player from "./Player";
import ShieldComponent from "../components/ShieldComponent";
/* END-USER-IMPORTS */

export default class Pencil extends Enemy {

    constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
        super(scene, x ?? 627, y ?? 667, texture || "pencil", frame);

        this.scaleX = 0.2;
        this.scaleY = 0.2;
        this.flipX = false;
        this.flipY = false;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.body.bounce.x = 0;
        this.body.bounce.y = 0;
        this.body.pushable = true;
        this.body.setOffset(0, 0);
        this.body.setCircle(64);

        // Set collider for the Pencil
        this.setCollider('box', { width: this.width, height: this.height });
    }

    /**
     * Handles collision with other game objects.
     * 
     * @param other - The game object the pencil collides with
     */
    public handleCollision(other:any){
        console.log('Pencil collision with', other);
        
        if(other instanceof Player){
            const player= other as Player;
            const shieldComponent= ShieldComponent.getComponent(other);

            // If player's shield is active, deactivate it and destroy the pencil
            if(shieldComponent.isShieldActive()){
                shieldComponent.setShieldActive(false);
                this.emit('destroyed', this);
            } else {
                // Check if the player is on top of the pencil, taking into account the buffer
                if (player.y < this.y && player.body.velocity.y > 500) {
                    // Apply a downward force to the pencil
                    this.body.setVelocityY(player.body.velocity.y); // You can adjust this value as needed
                    player.body.setGravityY(player.defaultGravity);
                    player.body.setVelocityY(player.jumpVelocity);
                } else {
                    // Player collides with the pencil from the side or bottom, trigger game over
                    this.scene.events.emit('gameOver');
                }
            }
        }

        // If pencil collides with another enemy and the velocity is high enough, destroy the pencil
        if(other instanceof Enemy){
            const pencil= other as Enemy;
            if (pencil.body.velocity.y > 500) {
                this.emit('destroyed', this);
            }
        }
    }
}

/* END OF COMPILED CODE */

// You can write more code here
