export default class Map extends Game {
    constructor(config) {
        super(config)
        this.cols = config.cols
        this.rows = config.rows
        this.tsize = config.tsize
        this.tiles = config.tiles
        // console.log(this)
    }
    getTile() { }
    draw() {
        for (var column = 0; column < this.cols; column++) {
            for (var row = 0; row < this.rows; row++) {
                var tile = this.getTile(column, row);
                var x = column * this.tsize;
                var y = row * this.tsize;
                //drawTile(tile, x, y);
                if (this.debug) {
                    this.context.save()
                    this.context.strokeStyle = 'white'
                    this.rect(x, y, this.tsize, this.tsize)
                    this.context.restore()
                }
            }
        }
    }
}

