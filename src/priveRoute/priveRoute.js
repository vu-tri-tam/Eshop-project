
// import React, { useContext } from 'react'
// import { Redirect, Route } from 'react-router'
// import { AuthContext } from '../contexts/AuthCtrolAll';




// const PrivateRoute = ({ component: Component, ...rest }) => {
//     // const { authState: { user } } = useContext(AuthContext)
//     const { authState: {  user } } = useContext(AuthContext)
//     console.log(user&&user, 556);

//     return (

//         <Route
//             {...rest}
//             render={props => {

//                 if (user&&user !== null) {

//                     if (user.decentralization !== true) {
//                         return <Component {...props} />
//                     } else {
//                         return <Redirect to={{ pathname: "/admin", state: 
//                         { from: props.location } }} />
//                     }

//                 } else {
//                     return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
//                 }
//             }}
//         />


//     )
// }

// export default PrivateRoute
