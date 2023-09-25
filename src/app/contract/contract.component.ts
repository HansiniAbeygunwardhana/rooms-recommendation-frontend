import { Component , Input } from '@angular/core';
import { Contract } from '../models/contract';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ContractService } from '../services/contract.service';
import { ToastrService } from 'ngx-toastr';
import { CustomResponse } from '../models/response';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent {

  @Input() contractList! : Contract[] ;
  @Input() hotelId! : number;
  selectedContractId! : number ;
  showModal = false;
  showEditForm = false;
  updatingContract! : Contract


  constructor(private contractService : ContractService , private toastr : ToastrService) {
  }

  contractForm = new FormGroup ({
    startingDate : new FormControl("" , {
      validators : [Validators.required],
      nonNullable : true
    }),
    endingDate : new FormControl("" ,{
      validators : [Validators.required],
      nonNullable : true 
    }),
  })



  async onSubmit() {
    if (this.contractForm.valid) {
      const newData : Contract= {
        startingDate :  new Date(this .contractForm.value.startingDate as string) ,
        endingDate :  new Date(this .contractForm.value.endingDate as string) ,
        hotelId : this.hotelId
      }
      const message = (await this.contractService.addContract(newData)).message
      this.contractList = await this.contractService.getContractsByHotelId(this.hotelId)
      this.toastr.success(message)
      this.closeModal()

    }
  }

  onClickViewRooms(contractId?: number) {
    if (contractId) {
      if (this.selectedContractId === contractId) {
        this.selectedContractId = -1; // Hide room type if it's already visible
      } else {
        this.selectedContractId = contractId; // Show room type for the selected contract
      }
    }
  }

  async onClickDeleteButton(contractId?: number){
    if (contractId) {
      console.log(contractId)
      await this.contractService.deleteContract(contractId)
      this.contractList = await this.contractService.getContractsByHotelId(this.hotelId)
    }
    
  }

  async onClickEditButton(contractId? : number){

    if (contractId) {
      this.updatingContract = await this.contractService.getContracts(contractId);
      if (this.updatingContract) {
        this.showEditForm = true
        console.log(this.updatingContract)
        this.contractForm.setValue({
          startingDate: this.converDatetoString(this.updatingContract.startingDate),
          endingDate: this.converDatetoString(this.updatingContract.endingDate),
        });
        this.showModal = true
      }
      
    }
  }

  async onUpdate(){

    if (this.contractForm.valid && this.updatingContract.id) {
      const newData : Contract= {
        startingDate :  new Date(this .contractForm.value.startingDate as string) ,
        endingDate :  new Date(this .contractForm.value.endingDate as string) ,
        hotelId : this.hotelId
      }
      const message = (await this.contractService.updateContracts(this.updatingContract.id ,newData)).message
      this.contractList = await this.contractService.getContractsByHotelId(this.hotelId)
      this.toastr.success(message)
      this.closeModal()

    }
  }

  openModal() {
    this.showModal = true;
    this.contractForm.reset()
  }

  closeModal() {
    this.showModal = false;
  }
  
  converDatetoString ( date : Date) {
    return date.toString().split('T')[0];
  }


}
