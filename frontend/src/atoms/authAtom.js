// to determine whether in login or signup page
import { atom } from "recoil";

const authScreenAtom=atom({

    key:"authScreenAtom",  // needed to differentiate which atom is which one
    default:"login",
})

export default authScreenAtom;