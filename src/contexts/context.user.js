import React, {useState} from "react";
import {accountService} from "../_services";

// https://stackoverflow.com/questions/61106127/react-context-api-create-context-from-axios-response
export const UserContext = React.createContext({});

export const UserContextWrapper = props => {
    const [user, setUser] = useState(accountService.getUserSession() || undefined);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser
            }} // value of your context
        >
            {props.children}
        </UserContext.Provider>
    );
}