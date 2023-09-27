import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HotelComponent } from './hotel/hotel.component';
import { FormsModule} from '@angular/forms';
import { ContractComponent } from './contract/contract.component';
import { RoomtypeComponent } from './roomtype/roomtype.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { heroUsers , heroBars4 , heroHome , heroXMark , heroPlusSmall , heroPlus  , heroMinus , heroChevronDown } from '@ng-icons/heroicons/outline';
import { matDeleteOutline  , matEditOutline , matArrowBackIosOutline , matArrowForwardIosOutline } from '@ng-icons/material-icons/outline'
import { NgIconsModule } from '@ng-icons/core';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SearchResultComponent } from './search-result/search-result.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationbarComponent,
    HomeComponent,
    HotelComponent,
    ContractComponent,
    RoomtypeComponent,
    PopupModalComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NoopAnimationsModule,
    NgIconsModule.withIcons({heroUsers , heroBars4 , heroHome , heroXMark , heroPlusSmall , 
                              heroPlus , heroMinus , heroChevronDown , matDeleteOutline , matEditOutline , 
                                matArrowForwardIosOutline , matArrowBackIosOutline}),
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut : 2000,
      positionClass : 'toast-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
