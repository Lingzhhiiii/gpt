import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Path, SlotID } from "./constant";

interface responseData {
  data: {
    username: string;
    expiration_time: number;
  };
  result: string;
}
interface InterceptorProps {
  doSubmit: (userInput: string) => void;
}
// : React.FC<InterceptorProps>
const Interceptor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = {
          token: token,
        };
        // client端在这里附上token
        const response = await fetch("/api/jwt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jwt),
        });

        if (response.ok) {
          const data: responseData = await response.json();
          if (data.result === "success") {
            console.log("[success]: " + data.result);
          } else {
            console.log("[fail]: " + data.result);
            alert("您没有相应权限");
            navigate(Path.AuthFail);
          }
        } else {
          console.log("response: ", response);
          navigate(Path.AuthFail);
        }
      } catch (error) {
        console.log("error: " + error);
        navigate(Path.AuthFail);
      }
    };

    fetchData();
  }, [token]);
  return null;
};

export default Interceptor;
