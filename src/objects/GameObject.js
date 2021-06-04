export default class {
  constructor(graphic){
    this.graphic = graphic
  }
  getGraphic(){
    return this.graphic
  }
  setCoords(x, y){
    this.graphic.x = x
    this.graphic.y = y
  }
}