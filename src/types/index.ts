export interface IAdvert {
  advertId: string | null
  status: string | null
  room: string | null
  squareMetres: number | null
  buildingAge: number | null
  price: number | null
  city: string | null
  district: string | null
  currentFloor: number | null
  furnitureStatus: string | null
  company: string | null
  link: string | null
}

export type IAdvertInfoHandler = (advertLink: string) => Promise<IAdvert>
