class Box {
    constructor(x, y, w, h, BoxOptions) {
        var BoxOptions = {
            isStatic: true
        }

        this.body = Bodies.rectangle(x, y, w, h, BoxOptions);
        this.w = w;
        this.h = h;
        this.color = color;
        World.add(world, this.body);
    }

    show() {
        let pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        fill("white");
        rect(0, 0, this.w, this.h);
        pop();
    }
}