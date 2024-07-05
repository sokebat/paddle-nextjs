import {
  doc,
  Firestore,
  getFirestore,
  setDoc
} from "firebase/firestore";
import firebase_app from "../config";

interface AddDataArgs {
  collectionName: string;
  id: string;
  data: any;
}

const db: Firestore = getFirestore(firebase_app);

export default async function addData({
  collectionName,
  id,
  data,
   
}: AddDataArgs): Promise<{ result: any | null; error: any | null }> {
  let result: any | null = null;
  let error: any | null = null;

  try {
    
      const docRef = doc(db, collectionName, id);
      result = await setDoc(docRef, data, { merge: true });
 
     
  } catch (e) {
    error = e;
  }

  return { result, error };
}
