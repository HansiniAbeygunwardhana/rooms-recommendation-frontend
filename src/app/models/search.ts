export interface SearchData {

    checkInDate : Date;
    numberOfNights : number;
    rooms : Rooms[]
}

interface Rooms {
    numberOfAdults : number ;
    numberOfRooms : number;
}