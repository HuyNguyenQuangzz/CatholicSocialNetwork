import { atom } from "recoil";

const userAtom = atom({
  key: "userAtom",
  default: localStorage.getItem("user-catholic") !== null 
    ? JSON.parse(localStorage.getItem("user-catholic"))
    : null,
  // Parse the JSON string from localStorage, or return null if the item doesn't exist. This prevents errors when trying to parse null.
  // explain
});

export default userAtom;
