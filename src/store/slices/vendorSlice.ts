import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VendorState } from "../../interfaces/VendorState";
import { ContactPerson } from "../../interfaces/ContactPerson";

const initialState: VendorState = {
  primaryContact: {
    salutation: "Mr.",
    firstName: "",
    lastName: "",
  },
  companyName: "",
  email: "",
  gstNumber: "",
  cinNumber: "",
  workPhone: "",
  mobile: "",
  communicationChannel: ["email"],
  contactPersons: [],
};
const vendorSlices = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    addVendorData(state, action: PayloadAction<Partial<VendorState>>) {
      Object.assign(state,action.payload)
    },
    addContactPersonsData(state, action: PayloadAction<ContactPerson[]>) {
      state.contactPersons = action.payload;
    },
    deleteContactPersonsData(state, action: PayloadAction<number>) {
      state.contactPersons.splice(action.payload, 1);
    },
    editContactPersonsData(state, action: PayloadAction<ContactPerson>) {
      const person = state.contactPersons.find(
        (item) => item.key === action.payload.key
      );
      if (person) {
        Object.assign(person, action.payload);
      }
    },
    resetVendor() {
      return initialState;
    },
  },
});
export const{addVendorData,addContactPersonsData,deleteContactPersonsData,editContactPersonsData,resetVendor}=vendorSlices.actions
export default vendorSlices.reducer;
