import { Component , Input  , OnChanges} from '@angular/core';
import { Contract } from '../models/contract';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ContractService } from '../services/contract.service';
import { ToastrService } from 'ngx-toastr';
import { CustomResponse } from '../models/response';
import { PaginatedResponse } from '../models/pages';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnChanges {

  contractList! : Contract[] ;
  @Input() hotelId! : number;
  selectedContractId! : number ;
  showModal = false;
  showEditForm = false;
  updatingContract! : Contract
  pageDetails! : PaginatedResponse<Contract>
  pageNumber = 0
  itemsPerPage = 4

  constructor(private contractService : ContractService , private toastr : ToastrService) {
  }

 async ngOnChanges(): Promise<void> {
      this.pageDetails = await this.contractService.getContractsByHotelId(this.hotelId , 0 , this.itemsPerPage)
      this.contractList =  this.pageDetails.content
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
      this.pageDetails = await this.contractService.getContractsByHotelId(this.hotelId , this.pageNumber , this.itemsPerPage)
      this.contractList = this.pageDetails.content
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
      this.pageDetails = await this.contractService.getContractsByHotelId(this.hotelId , this.pageNumber , this.itemsPerPage)
      this.contractList = this.pageDetails.content
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
      this.pageDetails = await this.contractService.getContractsByHotelId(this.hotelId , this.pageNumber , this.itemsPerPage)
      this.contractList = this.pageDetails.content
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
    this.showEditForm = false;
  }
  
  converDatetoString ( date : Date) {
    return date.toString().split('T')[0];
  }

 async nextPage(){
    if (this.pageNumber < this.pageDetails.totalPages -1) {
      this.pageNumber++
      this.pageDetails = await this.contractService.getContractsByHotelId(this.hotelId , this.pageNumber , this.itemsPerPage)
      this.contractList = this.pageDetails.content
    }

  }

 async previousPage(){
    if (this.pageNumber >= 0) {
      this.pageNumber--
      this.pageDetails = await this.contractService.getContractsByHotelId(this.hotelId , this.pageNumber , this.itemsPerPage)
      this.contractList = this.pageDetails.content
    }
  }

}
