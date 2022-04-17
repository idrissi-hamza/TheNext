import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { useCtrlContext } from "./useCtrlContext";

export const useCollection = (collection, query, orderBy, day,status) => {
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

    if (day) {
      ref = ref.where(...day);
    }
    if (status) {
      ref = ref.where(...status);
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
        console.log(error);
        setError("could not fetch data");
      }
    );

    //unsubscribe on mount
    return () => unsubscribe();
  }, [day]);

  return { documents, error };
};
