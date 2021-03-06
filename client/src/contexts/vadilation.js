import React, { useState } from "react";
// Contexts
import { useUserData } from "./usersData";
import { useUtils } from "./utilsContext";
const VadilationContext = React.createContext();

function VadilationProvider(props) {
  const { password, email, passwordConfirmed } = useUserData();
  const { isAlert, setIsAlert } = useUtils();
  // This Zone is for Register form vadilate only -------------------------------------
  const [step, setStep] = useState(0);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isAccountValid, setIsAccountValid] = useState(false);
  const [isErrorRoleRec, setIsErrorRoleRec] = useState(false);
  const [isErrorRolePro, setIsErrorRolePro] = useState(false);
  // Form Vadilate Checker Fx -----------------------------------
  const ifInputIsBlank = () => {
    // if input is blank
    if (password === "" || email === "") {
      if (password === "") {
        setIsErrorPassword(true);
      } else if (email === "") {
        setIsErrorEmail(true);
      }
    } else {
      if (!password === "") {
        setIsErrorPassword(false);
      } else if (!email === "") {
        setIsErrorEmail(true);
      }
    }
  };

  const ifPasswordIsBlank = () => {
    // if password & confirm password is blank
    if (password === "" && passwordConfirmed === "") {
      setIsErrorPassword(true);
    }
    if (!email.match(/^\w+([\.-]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g)) {
      //  if email is not validattion
      setIsErrorEmail(true);
    } else {
      setIsErrorEmail(false);
    }
  };

  const ifPassWordIsNotCorrect = () => {
    // if password is not correct
    if (password !== passwordConfirmed) {
      setIsErrorPassword(true);
    } else if (
      password === passwordConfirmed &&
      password !== "" &&
      passwordConfirmed !== ""
    ) {
      setIsErrorPassword(false);
    }
  };

  const nextFormVadilateChecker = () => {
    ifInputIsBlank();
    ifPasswordIsBlank();
    ifPassWordIsNotCorrect();
    // if all correct
    if (
      password === passwordConfirmed &&
      password !== "" &&
      passwordConfirmed !== "" &&
      email.match(/^\w+([\.-]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g) &&
      password.length >= 6 &&
      password.length <= 18
    ) {
      setStep(step + 1);
      setIsErrorEmail(false);
      setIsErrorPassword(false);
    }
  };
  // Backdrop Loading... Zone ---------------------------
  const [loading, setLoading] = React.useState(false);
  const handleClose = () => {
    setLoading(false);
  };
  const handleToggle = () => {
    setLoading(!loading);
  };

  // Alert Dialog Zone -----------------------------------

  const openAlert = () => {
    isAlert(true);
  };

  const closeAlert = () => {
    setIsAlert(false);
  };
  return (
    <VadilationContext.Provider
      value={{
        // This Zone is for Register form vadilate only -------------------------------------
        step,
        setStep,
        isErrorEmail,
        setIsErrorEmail,
        isErrorPassword,
        setIsErrorPassword,
        isErrorRoleRec,
        setIsErrorRoleRec,
        isErrorRolePro,
        setIsErrorRolePro,
        isAccountValid,
        setIsAccountValid,
        // vadilate fx only -------------------------------------
        ifInputIsBlank,
        ifPasswordIsBlank,
        ifPassWordIsNotCorrect,
        nextFormVadilateChecker,
        // Backdrop Loading... Zone ---------------------------
        loading,
        setLoading,
        handleClose,
        handleToggle,
        // Alert Dialog Zone -----------------------------------
        isAlert,
        setIsAlert,
        openAlert,
        closeAlert,
      }}
    >
      {props.children}
    </VadilationContext.Provider>
  );
}

const useVadilation = () => React.useContext(VadilationContext);

export { VadilationProvider, useVadilation };
