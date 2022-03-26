class Character {
    constructor(x, y, w, h, options) {
        var options = {
            isStatic: false
        }

        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
        World.add(world, this.body);
    }

    show() {
        let pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        rectMode(CENTER);
        fill("brown");
        rect(0, 0, this.w, this.h);
        pop();
    }
}