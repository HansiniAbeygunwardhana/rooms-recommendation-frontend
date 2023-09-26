import { Component } from '@angular/core';
import { Hotel } from '../models/hotel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../services/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { CustomResponse } from '../models/response';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent {

  showFormModal = false
  showAllHotelViewModal = false
  showHotelDetails = false
  hotelList! : Hotel[]
  hotelDetails! : Hotel ;
  selectedHotelId! : number;
  updatingHotel! : Hotel;
  showUpdatingForm = false;
  


  constructor(private hotelService : HotelService , private toastr : ToastrService) {
    this.hotelService.getAllHotels().then(
      (hotelList : Hotel[]) => {
        this.hotelList = hotelList
      }
    )
  }

  hotelForm = new FormGroup({
    hotelName : new FormControl("" , [Validators.required]),
    hotelAddress : new FormControl("" , [Validators.required]),
  })

 async onSubmit(){
    const newHotel = this.hotelForm.value as Hotel

    if (this.hotelForm.valid) {
     const response : CustomResponse = await this.hotelService.addNewHotel(newHotel)
     this.hotelForm.reset()
     this.hotelList = await this.hotelService.getAllHotels()
      this.closeModal()
      this.toastr.success(response.message)
    }

  }

  onSelectHotel(hotelId : number) : void {
    this.selectedHotelId = hotelId;
    if (hotelId) {
      this.hotelService.getHotelById(hotelId).then(
        (hotel : Hotel) => {
          this.hotelDetails = hotel
          this.showHotelDetails = true
        }
      )
    }
  }

  async onClickDeleteButton(hotelId : number){

    const res : CustomResponse = await this.hotelService.deleteHotelById(hotelId)
    this.toastr.error(res.message)
  }

  async onClickEditButton(hotelId : number) {

    this.updatingHotel = await this.hotelService.getHotelById(hotelId)
    this.hotelForm.setValue({
      hotelName : this.updatingHotel.hotelName ,
      hotelAddress : this.updatingHotel.hotelAddress
    })
    this.showAllHotelViewModal = false;
    this.showFormModal  = true;
    this.showUpdatingForm = true;
  }

  async onUpdate(){

    const updatedData : Hotel =  this.hotelForm.value as Hotel
    const message = (await this.hotelService.updateHotel(this.updatingHotel.id , updatedData)).message
    this.hotelList = await this.hotelService.getAllHotels()
    this.toastr.success(message)
    this.closeModal()
  }


  openModal() {
    this.showFormModal = true;
    this.hotelForm.reset()
  }

  closeModal() {
    this.showFormModal = false;
  }

  handleHotelViewModal(){
    this.showAllHotelViewModal = !this.showAllHotelViewModal
  }

}
