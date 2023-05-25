
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class CircularTimer extends Phaser.GameObjects.Graphics {
    private timerEvent!: Phaser.Time.TimerEvent;
    private totalTime!: number;
    private callback: Function;
    private circleColour:string="#5A98F9";
    private radius:number=0;
    private myScene:Phaser.Scene;
    constructor(scene: Phaser.Scene, x: number, y: number, radius:number,callback?: Function ) {
        super(scene, { x, y });
        this.scene = scene; // Add this line
        this.radius=radius
        this.callback = callback || (() => { });
        this.myScene=this.scene;
    }

    start(duration: number = 5000): void {
        if (this.timerEvent && !this.timerEvent.paused) {
            return;
        }

        this.totalTime = duration;

        this.timerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: () => {
                this.callback();
                this.timerEvent.destroy();
                this.clear();
                this.myScene.time.delayedCall(1000, () => this.destroy());
                this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
            }
        });
    }
    stop() {
  this.callback();
  this.timerEvent.destroy();
  this.clear();
  // Check if the timer is still part of a scene
  if (this.scene) {
    this.scene.time.delayedCall(1000, () => this.destroy());
  }
}

    update(): void {
        if (!this.timerEvent || !this.scene) {
            return;
        }

        const elapsedTime = this.timerEvent.getElapsed();
        const remainingTime = this.totalTime - elapsedTime;

        if (remainingTime <= 0) {
            this.clear();
            return;
        }

        const completion = elapsedTime / this.totalTime;
        

        this.clear();
        this.fillStyle(parseInt(this.circleColour.slice(1), 16));
        this.beginPath();
        this.slice(0, 0,this.radius, Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(270 + 360 * completion), false);
        this.fillPath();
  }
}
