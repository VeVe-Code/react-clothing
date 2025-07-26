import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  let [user, Setuser] = useState(null);

  let getuser = async (token) => {
    try {
      let res = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check for auth error
      if (res.status === 200) {
        if (res.data[0]?.errors === "Unauthenticated") {
          console.log("Not logged in");
          return;
        }

        Setuser(res.data); // Set user data from response
      }
    } catch (error) {
      console.log("Error fetching user:", error.response?.data || error.message);
    }
  };
  let logout=()=>{
    localStorage.removeItem('token')
    Setuser(null);

  }
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      getuser(token);
    }
  }, []); // Dependency array prevents infinite loops

  return (
    <AuthContext.Provider value={{ user, getuser,logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
