import { Injectable } from '@angular/core';
import { Contract } from '../models/contract';
import axios from 'axios';
import { APiRoutes } from 'src/apiRoutes';
import { CustomResponse } from '../models/response';
import { PaginatedResponse } from '../models/pages';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  async addContract(contract : Contract) : Promise<CustomResponse> {
  return (await axios.post(APiRoutes.contract , contract)).data
  }

  async deleteContract(id : number) : Promise<CustomResponse>{
    return (await axios.delete(APiRoutes.ContractById(id))).data
  }

  async getContractsByHotelId(id : number , page : number , size : number) : Promise<PaginatedResponse<Contract>> {
    return (await axios.get(APiRoutes.ContractByHotelId(id , page , size))).data
  }

  async getContracts(id : number) : Promise<Contract> {
    return (await axios.get(APiRoutes.ContractById(id))).data
  }
 
  async updateContracts(id : number , contract : Contract) : Promise<CustomResponse> {
    return (await axios.put(APiRoutes.ContractById(id) , contract) ).data
  }





}
