import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const localUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null;
  //   const localUser = JSON.parse(localStorage.getItem("user"));
  const [currentUser, setCurrentUser] = useState(localUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (currentUser === "{}" || !currentUser) setIsAuthenticated(false);
    if (currentUser) setIsAuthenticated(true);
  }, [currentUser]);

  const signup = async (name, email, password) => {
    // const input = { name, email, password };
    // console.log(input);
    const res = await fetch(`/api/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
       mutation Mutation($signUpInput: SignUpInput!) {
        user: signUp(input: $signUpInput) {
          id
          name
          email
          role
          profile_image
        }
      }
       `,
        variables: `
       {
        "signUpInput": {
            "name": "${name}",
            "email": "${email}",
            "password":"${password}"
          }
       }
       `,
      }),
    });

    const data = await res.json();
    if (data.errors) {
      return { error: data.errors[0].message };
    }
    localStorage.setItem("currentUser", JSON.stringify(data.data.user));
    setCurrentUser(data.data.user);
  };

  const login = async (email, password) => {
    const res = await fetch(`/api/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query Query($email: String!, $password: String!) {
            user: login(email: $email, password: $password) {
              id
              name
              email
              role
              profile_image
            }
          }
      `,
        variables: {
          email,
          password,
        },
      }),
    });

    // res.json().then((data) => {
    //   console.log(data);
    // });
    const data = await res.json();
    if (data.errors) return { error: data.errors[0].message };
    localStorage.setItem("currentUser", JSON.stringify(data.data.user));
    setCurrentUser(data.data.user);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const value = { currentUser, isAuthenticated, login, logout, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
