import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const login = (email: string, password: string) => {
   const auth = getAuth();
   return signInWithEmailAndPassword(auth, email, password)
}

export const signup = (email: string, password: string) => {
   const auth = getAuth();
   return signInWithEmailAndPassword(auth, email, password)
}