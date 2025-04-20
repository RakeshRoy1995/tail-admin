import React, { Suspense, FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/app/Layout";
import ChangePassword from "./ChangePassword";
import ForgotPassword from "@/pages/Login/ForgotPassword";

import LoanRepaymentForm from "@/LoanRepaymentForm";
import PhasesForm from "@/pages/Form/PhasesForm";
const HomeEntryPage = React.lazy(
  () => import("@/pages/HomeEntryPage/HomeEntryPage"),
);
import PhaseOverView from "@/pages/PhaseOverView/PhaseOverView";
import PhaseOutput from "@/pages/PhaseOutput/PhaseOutput";
import BlockOutput from "@/pages/BlockOutput/BlockOutput";
import Admin from "./Admin";
import BlockOverview from "@/pages/BlockOverview/BlockOverview";
const Home = React.lazy(() => import("@/pages/Home/index"));
import MemberAdmin from "@/pages/member/admin/MemberAdmin";
import ProblemDefLayout from "@/pages/problemDefLayout/ProblemDefLayout";
import LeftSideMenuBar from "./Layout/LeftSideMenuBar";
import BlockUserOutput from "@/pages/BlockOverview/BlockUserOutput";
import AIModelMgt from "@/pages/AI-model-mgt/AIModelMgt";
import AddPhase from "@/pages/PhaseOverView/AddPhase";
import GuidePrompt from "@/pages/guide-prompt/GuidePrompt";
import Example from "@/pages/exapmle/Example";
const PrivateRoute = React.lazy(() => import("./PrivateRoute"));
const Login = React.lazy(() => import("@/pages/Login/Login"));

const RegisterForm = React.lazy(() => import("@/pages/register/Index"));
const PropsedSystemMappainig = React.lazy(
  () => import("@/pages/PropsedSystemMappainig/PropsedSystemMappainig"),
);

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
            <Route path="/example" element={<Example />} />
            <Route path="/problem-def" element={<ProblemDefLayout />} />
            <Route path="/" element={<Layout />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/phase-overview" element={<PhaseOverView />} />
              <Route path="/block-overview" element={<BlockUserOutput />} />
              <Route path="/add-phase" element={<AddPhase />} />
              <Route path="/add-block" element={<BlockOverview />} />
              <Route path="/phase-output" element={<PhaseOutput />} />
              <Route path="/block-output" element={<BlockOutput />} />
              <Route path="/ai-model-mgmt" element={<AIModelMgt />} />
              <Route path="/guide-prompts" element={<GuidePrompt />} />

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
