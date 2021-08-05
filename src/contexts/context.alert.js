import React, { useState} from "react";
import {AlertType} from "../_services";
import AlertPopUp from "../components/snackbars/AlertPopUp";

// https://stackoverflow.com/questions/61106127/react-context-api-create-context-from-axios-response
export const AlertContext = React.createContext({});

export const AlertContextWrapper = props => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("Welcome");
    const [alertType, setAlertType] = useState(AlertType.INFO);
    // const [alertConfirm, setAlertConfirm] = useState(false);
    // const [alertConfirmMessage, setAlertConfirmMessage] = useState("");
    // const [alertConfirmed, setAlertConfirmed] = useState(false);
    // const [alertActionHandler, setAlertActionHandler] = useState('() => {}');

    return (
        <AlertContext.Provider
            value={{
                setAlertOpen,
                setAlertMessage,
                setAlertType,
                // setAlertConfirm,
                // setAlertConfirmMessage,
                // alertConfirmed,
                // setAlertConfirmed,
                // setAlertActionHandler
            }} // value of your context
        >
            <AlertPopUp alertOpen={alertOpen}
                        setAlertOpen={setAlertOpen}
                        alertMessage={alertMessage}
                        alertType={alertType}
                        // alertConfirm={alertConfirm}
                        // alertConfirmMessage={alertConfirmMessage}
                        // alertConfirmed={alertConfirmed}
                        // setAlertConfirmed={setAlertConfirmed}
                        // setAlertConfirm={setAlertConfirm}
                        // alertActionHandler={alertActionHandler}
            />
            {props.children}
        </AlertContext.Provider>
    );
}