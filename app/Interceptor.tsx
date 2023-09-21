import { useEffect } from "react";

interface responseData {
  data: {
    username: string;
    expiration_time: number;
  };
  result: string;
}

const Interceptor = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = {
          token: "token",
        };
        // client端在这里附上token
        const response = await fetch("http://tools.youren.online/jwt/", {
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
            // 用户token通过，予以放行
          } else {
            console.log("[fail]: " + data.result);
            // token不通过
          }
        } else {
          console.log("response: ", response);
          // 网络异常
        }
      } catch (error) {
        console.log("error: " + error);
        // 处理其他异常
      }
    };

    fetchData();
  }, []); // 只在组件加载时执行一次

  return null;
};

export default Interceptor;
