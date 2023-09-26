import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomtypeService } from '../services/roomtype.service';
import { Roomtype } from '../models/roomtype';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls: ['./roomtype.component.css']
})
export class RoomtypeComponent  implements OnInit{

  @Input() contractId!: number;
  roomTypes! : Roomtype[] ;
  showModal =false
  updatingRoom! : Roomtype
  showUpdateForm = false

  constructor(private roomtypeService: RoomtypeService , private toastr : ToastrService ) { }


  roomTypeForm = new FormGroup({
    roomType: new FormControl('', {
      validators : [Validators.required],
      nonNullable : true
    }),
    numberOfAdultsPerRoom: new FormControl<number>(0, {
      validators : [Validators.required],
      nonNullable : true
    }),
    availableRooms: new FormControl<number>(0, {
      validators : [Validators.required],
      nonNullable : true
    }),
    price: new FormControl<number>(0, {
      validators : [Validators.required],
      nonNullable : true
    }),
  });

  async ngOnInit(): Promise<void> {
    this.roomTypes =  await this.roomtypeService.getRoomsByContractId(this.contractId)
    }


    async addingData(){
      const formData = {
        ...this.roomTypeForm.value ,
        contractId : this.contractId
      } as Roomtype ;
     await this.roomtypeService.addRoomtype(formData)
    }

  async onSubmit() {
    
   
    if (this.roomTypeForm.valid) {
      await this.addingData()
      this.roomTypes =  await this.roomtypeService.getRoomsByContractId(this.contractId)
      this.closeModal()
    }
    
  }

  async handleAddAnother(){
    if (this.roomTypeForm.valid) {
      await this.addingData()
      this.roomTypes =  await this.roomtypeService.getRoomsByContractId(this.contractId)
      this.roomTypeForm.reset()
    }
  }

  async onClickEditButton(id : number){
    
    this.updatingRoom = await this.roomtypeService.getRoomTypeById(id)
    if (this.updatingRoom) {
      this.roomTypeForm.setValue({
        availableRooms : this.updatingRoom.availableRooms , 
        numberOfAdultsPerRoom : this.updatingRoom.numberOfAdultsPerRoom,
        price : this.updatingRoom.price,
        roomType : this.updatingRoom.roomType
      })
      this.showModal = true
      this.showUpdateForm = true
    }
  }

  async onClickDeleteButton(id: number) {
    try {
      const response = await this.roomtypeService.deleteRoomType(id);
      const message = response.message;
      this.roomTypes = await this.roomtypeService.getRoomsByContractId(this.contractId);
      this.toastr.success(message);
    } catch (error) {
      console.error("Error deleting room type:", error);
      this.toastr.error("An error occurred while deleting the room type.");
    }
  }

  async onUpdate(){

    if (this.roomTypeForm.valid) {
      const newData = {
        ...this.roomTypeForm.value,
        contractId : this.contractId
      } as Roomtype
      const message = (await this.roomtypeService.updateRoomType(this.updatingRoom.id , newData)).message
      this.toastr.success(message)
      this.roomTypes = await this.roomtypeService.getRoomsByContractId(this.contractId)
    }
    this.closeModal()
  }
  


  openModal() {
    this.showModal = true;
    this.roomTypeForm.reset()
  }

  closeModal() {
    this.showModal = false;
  }
  
}
