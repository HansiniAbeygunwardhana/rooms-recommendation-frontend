import { Injectable } from '@angular/core';
import { SearchData } from '../models/search';
import axios from 'axios';
import { APiRoutes } from 'src/apiRoutes';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  async search(searchData : SearchData) : Promise<any> {
      return (await axios.post(APiRoutes.search , searchData)).data
  }
}
