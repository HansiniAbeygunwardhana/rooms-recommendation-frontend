export interface SearchResult {

    basicRoomTypes : BasicRoomTypes[];
    contractId : number;
    endingDate : Date;
    startingDate : Date;
    hotelName : string;
}

interface BasicRoomTypes {
    id : number;
    numberOfAvailableRooms : number;
    price : number;
    roomType: string
}