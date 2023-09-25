import { Component } from '@angular/core';
import { SearchData } from '../models/search';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { SearchResult } from '../models/searchresult';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {

  searchData!: SearchData;
  searchResults: SearchResult[] = []; // Initialize as an empty array

  isLoading: boolean = true; // Add a loading indicator

  constructor(private searchService: SearchService, private route: ActivatedRoute) {
    
    const searchParams = this.route.snapshot.queryParamMap.get('searchData');
    if (searchParams) {
      this.searchData = JSON.parse(searchParams);
      this.getSearchResult(this.searchData);
    }
  }

  async getSearchResult(searchData: SearchData) {
    try {
      const res = await this.searchService.search(searchData);
      this.searchResults = res;
      this.isLoading = false; 
    } catch (error) {
      console.error('Error fetching search results:', error);
      this.isLoading = false; 
    }
  }
}
