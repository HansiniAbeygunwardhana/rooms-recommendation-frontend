import { Injectable } from '@angular/core';
import {  Roomtype } from '../models/roomtype';
import axios from 'axios';
import { APiRoutes } from 'src/apiRoutes';
import { CustomResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class RoomtypeService {

  async  addRoomtype(roomType :Roomtype) {
    try {
      await axios.post(APiRoutes.roomTypes , roomType)
    } catch (error) {
      console.log(error)
    }
  }

  async getRoomsByContractId(id : number) : Promise<Roomtype[]> {
    try {
      return (await axios.get(APiRoutes.roomtypebyId(id))).data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteRoomType(id : number) : Promise<CustomResponse> {
    return (await axios.delete(APiRoutes.roomtypebyId(id))).data
  }

  async getRoomTypeById(id : number) : Promise<Roomtype>{
    return (await axios.get(APiRoutes.roomtypebyIdUrl(id))).data
  }

  async updateRoomType(id: number , roomType : Roomtype) :Promise<CustomResponse>{
    return (await axios.put(APiRoutes.roomtypebyId(id), roomType)).data
  }


}
