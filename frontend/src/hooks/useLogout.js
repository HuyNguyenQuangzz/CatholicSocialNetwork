import userAtom from "../atoms/userAtom";
import { useSetRecoilState } from "recoil";
import useShowToast from "./useShowToast";

const useLogout = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();

  const logout = async () => {
    try {
      if (!window.confirm("Are you sure to logout?")) return;

      // const res = await fetch("/api/users/logout", {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      localStorage.removeItem("user-catholic");
      setUser(null);
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return logout;
};

export default useLogout;
