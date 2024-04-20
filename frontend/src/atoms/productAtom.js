import { atom } from "recoil";

export const productsState = atom({
  key: 'productsState',
  default: [], // Replace with your product data (e.g., fetched from API)
});


// export default cartAtom;