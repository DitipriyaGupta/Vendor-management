import { ContactPerson } from "./ContactPerson"

export  interface VendorState{
    primaryContact:{
        salutation:'Mr.' | 'Ms.' | 'Dr.',
        firstName:string,
        lastName:string
    },
    companyName:string,
    email:string,
    gstNumber:string,
    cinNumber:string,
    workPhone:string,
    mobile:string,
    communicationChannel:string[],
    contactPersons:ContactPerson[]
}
