
const baseUrl = "http://localhost:5000/api"

export const APiRoutes = {

    getAllCustomers : `${baseUrl}/customers` , 
    addCustomer : `${baseUrl}/customers/add` , 
    deleteCustomer (id : number) {return `${baseUrl}/customers/delete/${id}`},
    hotels : `${baseUrl}/hotels` ,
    hotelsbypage : `${baseUrl}/hotels/page` ,
    hotelById (id : number) {return `${baseUrl}/hotels/${id}`} ,
    deleteHotelById (id : number) {return `${baseUrl}/hotels/delete/${id}`},
    roomTypes : `${baseUrl}/rooms` ,
    roomtypebyId (id : number) {return `${baseUrl}/rooms/${id}`},
    roomtypebyIdUrl (id : number) {return `${baseUrl}/rooms/id${id}`},
    ContractByHotelId (id : number) {return `${baseUrl}/contract/hotel${id}`},
    ContractById (id : number) {return `${baseUrl}/contract/${id}`},
    contract : `${baseUrl}/contract`,
    search : `${baseUrl}/search`
}