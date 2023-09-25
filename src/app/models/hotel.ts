import { Contract } from "./contract";

export interface Hotel {
    id : number , 
    hotelName : string , 
    hotelAddress : string,
    contracts : Contract[]
}
