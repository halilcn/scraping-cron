export interface IAdvert {
  advertId: string
  status: string
  room: string
  squareMetres: number
  buildingAge: number | null
  price: number
  city: string
  district: string
  currentFloor: number
  furnitureStatus: string
}
