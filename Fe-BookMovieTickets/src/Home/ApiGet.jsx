// GetApi.js
import { useState, useEffect } from "react";

const URL = "http://localhost:3000/pro";

export const GetApi = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(URL);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  //   tham số thứ 2 truyên vào là mảng giúp cho  useEffct chỉ render 1 lần tránh render nhiều lần

  return data;
};
