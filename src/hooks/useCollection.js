import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { useCtrlContext } from "./useCtrlContext";

export const useCollection = (collection, query, orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

 
  
  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

  

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        //update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.error(error.message);
        setError(`Could not fetch data : ${error.message}`);
      }
    );

    //unsubscribe on mount
    return () => unsubscribe();
  }, []);

  return { documents, error };
};
