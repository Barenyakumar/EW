import { createContext } from "react"
import { useReducer } from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("ed_pr_bk_gj_12_34")),
  // user: {
  //     _id:"62af66a1325dcc4be0ba905d",
  //     name:"Ayush Kuamr",
  //     username:"Pratik Kumar",
  //     email: "Pratik@hotmail.com",
  //     password:"$2b$10$2.uAeckxznctAoUc3TO0Qe5Dfc/TGisG4z6Lq1Es7t0A21GlTt85K",
  //     profilePicture:"profile.jpg",
  //     coverPicture:"",
  //     followers:Array,
  //     following:Array,
  //     isAdmin:false,
  //     isMentor:true,
  //     interests:["Cricket","Music","Dancing","Technology","Coocking","Riding horse"],
  //     language:["Hindi", "English", "French","Pacific"],
  //     expertise:["python"],
  // },
  isFetching: false,
  error: false,
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
