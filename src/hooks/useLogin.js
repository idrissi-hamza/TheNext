import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // sign the user in
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      // update state
      if (!isCanceled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCanceled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);
  return { login, error, isPending };
};
