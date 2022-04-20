import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { success: false, isPending: true, error: null, document: null };
    case "ERROR":
      return {
        success: false,
        isPending: false,
        error: action.payload,
        document: null,
      };
    case "ADDED_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: action.payload,
      };
    case "DELETED_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: null,
      };
    case "DOING_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: { ...document, status: "doing" },
      };
    case "DONE_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: { ...document, status: "done" },
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = projectFirestore.collection(collection);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
       await ref.doc(id).delete();
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
        payload: deleteDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" });
    }
  };
  // switch document from todo to doing
  const doingDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const doingDocument = await ref.doc(id).update({ status: "doing" });
      dispatchIfNotCancelled({
        type: "DOING_DOCUMENT",
        payload: doingDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: "something went wrong",
      });
    }
  };

  // switch document from  doing to done 
  const doneDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const doneDocument = await ref.doc(id).update({ status: "done" });
      dispatchIfNotCancelled({
        type: "DONE_DOCUMENT",
        payload: doneDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: "something went wrong",
      });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, doingDocument, doneDocument, response };
};
