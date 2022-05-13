// Contexts
import { useUserData } from "../../contexts/usersData";
// components
import ProRegisterForm1 from "./PRO-RegisterForm-1";
import ProRegisterForm2 from "./PRO-RegisterForm-2";
import ProRegisterForm3 from "./PRO-RegisterForm-3";
import RecRegisterForm1 from "./REC-RegisterFrom-1";
import RecRegisterForm2 from "./REC-RegisterFrom-2";

function MainRegisterForm({ userRole }) {
  const { role, step } = useUserData();
  const StepDisplay = () => {
    if (step === 0) {
      return userRole === "professional" ? (
        <ProRegisterForm1 />
      ) : (
        <RecRegisterForm1 />
      );
    } else if (step === 1) {
      return userRole === "professional" ? (
        <ProRegisterForm2 />
      ) : (
        <RecRegisterForm2 />
      );
    } else if (step === 2) {
      return userRole === "professional" ? <ProRegisterForm3 /> : null;
    }
  };
  return <div>{StepDisplay(role)}</div>;
}
export default MainRegisterForm;
