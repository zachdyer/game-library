Game.Map = {
    cols: 10,
    rows: 10,
    tsize: 64,
    tiles: [],
    getTile: function () {

    },
    draw: function () {
        for (var column = 0; column < this.cols; column++) {
            for (var row = 0; row < this.rows; row++) {
                var tile = this.getTile(column, row);
                var x = column * this.tsize;
                var y = row * this.tsize;
                //drawTile(tile, x, y);
                if (Game.debug) {
                    this.context.save()
                    this.context.strokeStyle = 'white'
                    this.rect(x, y, this.tsize, this.tsize)
                    this.context.restore()
                }
            }
        }
    },
    create: function (config) {
        console.log(this)
    }
}
export default Map {
    constructor(config){
        this.cols = config.cols
        this.rows = config.rows
        this.tsize = config.tsize
        this.tiles = config.tiles
    }
}

export function getTile() { }
export function draw(game) {
    for (var column = 0; column < this.cols; column++) {
        for (var row = 0; row < this.rows; row++) {
            var tile = this.getTile(column, row);
            var x = column * this.tsize;
            var y = row * this.tsize;
            //drawTile(tile, x, y);
            if (game.debug) {
                game.context.save()
                game.context.strokeStyle = 'white'
                game.rect(x, y, this.tsize, this.tsize)
                game.context.restore()
            }
        }
    }
}