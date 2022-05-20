import { Routes, Route } from "react-router-dom";
// Pages --------------------------------------------
import NotFoundPage from "../pages/NotFoundPage";
import FindJobsPage from "../pages/Professional/FindJobsPage";
import ComponentIndex from "../components/ComponentIndex";
import UpdateCompanyProfile from "../pages/Recruiter/CreateJobPage";
import SeeMorePage from "../pages/Professional/SeeMorePage";
import UpdatePersonalProfile from "../pages/Professional/UpdateProfile";

// Components
import Sidebar from "../components/Utilities/SideBar";

function ProfessionalApp() {
  return (
    <div className="App">
      <Sidebar barRole="professional" />
      <Routes>
        <Route path="/components" element={<ComponentIndex />} />
        <Route path="*" element={<NotFoundPage />}></Route>
        {/* Professional Route Start Here ------------------------------------ */}
        <Route path="/" element={<FindJobsPage />} />
        <Route path="/findjobs" element={<FindJobsPage />} />
        <Route path="/findjobs/:id" element={<SeeMorePage />} />
        <Route path="/applications" element={<NotFoundPage />} />
        <Route path="/following" element={<NotFoundPage />} />
        <Route path="/profile" element={<NotFoundPage />} />
        {/* Just for test Route Start Here ------------------------------------ */}
        <Route path="/updateprofile" element={<UpdatePersonalProfile />} />
        {/*         <Route path="/multiverse" element={<MultiFindJob />} />
         */}{" "}
      </Routes>
    </div>
  );
}

export default ProfessionalApp;
