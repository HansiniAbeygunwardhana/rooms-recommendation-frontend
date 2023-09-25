import { Injectable } from '@angular/core';
import { Hotel } from '../models/hotel';
import axios from 'axios';
import { APiRoutes } from 'src/apiRoutes';
import { CustomResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  async getAllHotels() : Promise<Hotel[]> {
    return (await (axios.get(APiRoutes.hotels))).data
  }

  async addNewHotel(hotel : Hotel) : Promise<CustomResponse> {
    return (await axios.post(APiRoutes.hotels , hotel)).data
  }

  async getHotelById(id:number) : Promise<Hotel>{
    return (await axios.get(APiRoutes.hotelById(id))).data
  }

  async deleteHotelById(id: number){
    return (await axios.delete(APiRoutes.deleteHotelById(id))).data
  }

  async updateHotel(id : number , hotel : Hotel) : Promise<CustomResponse> {
    return (await axios.put(APiRoutes.hotelById(id) , hotel)).data
  }
}
