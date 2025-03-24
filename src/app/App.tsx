import React, { Suspense, FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/app/Layout";
import ChangePassword from "./ChangePassword";
import ForgotPassword from "@/pages/Login/ForgotPassword";

import LoanRepaymentForm from "@/LoanRepaymentForm";
import PhasesForm from "@/pages/Form/PhasesForm";
import HomeEntryPage from "@/pages/HomeEntryPage/HomeEntryPage";
import PhaseOverView from "@/pages/PhaseOverView/PhaseOverView";
import PhaseOutput from "@/pages/PhaseOutput/PhaseOutput";
import BlockOutput from "@/pages/BlockOutput/BlockOutput";
import Admin from "./Admin";
import BlockOverview from "@/pages/BlockOverview/BlockOverview";
const Home = React.lazy(() => import("@/pages/Home/index"));
import MemberAdmin from "@/pages/member/admin/MemberAdmin";
import PropsedSystemMappainig from "@/pages/PropsedSystemMappainig/PropsedSystemMappainig";
const PrivateRoute = React.lazy(() => import("./PrivateRoute"));
const Login = React.lazy(() => import("@/pages/Login/Login"));

const RegisterForm = React.lazy(() => import("@/pages/register/Index"));

const Role = React.lazy(() => import("@/pages/user/role/Role"));
const MenuPage = React.lazy(() => import("@/pages/user/menu/MenuPage"));

const Employee = React.lazy(() => import("@/pages/user/employee/Employee"));
const User = React.lazy(() => import("@/pages/user/user/User"));
const RolePermissionManagement = React.lazy(
  () =>
    import("@/pages/user/role-permission-management/RolePermissionManagement"),
);

const App: FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* <Route path="/" element={<LayoutUser />}>
            <Route
              path="/apply-call-for-submission/:id"
              element={<OutreachCardsApply />}
            />
          </Route> */}
          <Route path="/" element={<HomeEntryPage />}></Route>

          <Route path="/" element={<PrivateRoute />}>
            <Route
              path="/propsed-system-mapping"
              element={<PropsedSystemMappainig />}
            />
            <Route path="/admin" element={<MemberAdmin />} />
            <Route path="/" element={<Layout />}>
              <Route path="/phase-overview" element={<PhaseOverView />} />
              <Route path="/block-overview" element={<BlockOverview />} />
              <Route path="/phase-output" element={<PhaseOutput />} />
              <Route path="/block-output" element={<BlockOutput />} />

              {/* <Route path="/" element={<Home />} /> */}
              {/* <Route path="/admin" element={<Admin />} /> */}

              {/* <Route path="/pmu" element={<Pmu/>}/> */}
              {/* <Route path="/Dashboard" element={<Dashboard/>}/> */}

              <Route path="/form-phase" element={<PhasesForm />} />
              <Route path="/dashboard/role" element={<Role />} />
              <Route path="/dashboard/employee" element={<Employee />} />
              <Route path="/dashboard/user" element={<User />} />

              <Route
                path="/dashboard/role-permission"
                element={<RolePermissionManagement />}
              />
              <Route path="/dashboard/menu" element={<MenuPage />} />

              <Route path="/change-password" element={<ChangePassword />} />

              <Route
                // target-report
                path="/payment-schedule-generation"
                element={<LoanRepaymentForm />}
              />
            </Route>
          </Route>

          {/* <Route path="/projectsetup"  element={<ProjectSetup/>}/> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
