import { useContext } from "react";
import GlobalContext from "../contexts/globalContext";

const useGlobalContext = () => {
    return useContext(GlobalContext)
}

export default useGlobalContext;