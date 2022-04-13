import { useState , useEffect} from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const [isCanceled, setIsCanceled] = useState(false);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      // sign the user out
      await projectAuth.signOut();

      // dispatch logout action
      dispatch({ type: "LOGOUT" });

      // update state only if it not canceled -> isCancled is  true on unmount
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

  return { logout, error, isPending };
};
