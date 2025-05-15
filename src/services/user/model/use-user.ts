import { useContext } from "react";
import UserContext from "../context/user.context";

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within an UserProvider");
    }
    return context;
};

export default useUser;
