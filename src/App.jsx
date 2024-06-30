import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { LandingPage } from './Pages/LandingPage';
import { UserSignupPage } from './Pages/UserSignupPage';
import { UserLoginPage } from './Pages/UserLoginPage';
import { VendorSignupPage } from './Pages/VendorSignupPage';
import { VendorLoginPage } from './Pages/VendorLoginPage';
import { VendorPackageAddUpdate } from './Pages/VendorPackageAddUpdate';
import { UserMyFavouriteVendors } from './Pages/UserMyFavouriteVendors';
import { UserEventPlanMain } from './Pages/UserEventPlanMain';
import { UserVendorPayment } from './Pages/UserVendorPayment';
import { AdminEventCategory } from './Pages/AdminEventCategory';
import { AdminEventService } from './Pages/AdminEventService';
import { AdminEventSubService } from './Pages/AdminEventSubService';
import { UserVendorCards } from './Pages/UserVendorDashbord';
import { UserVendorDetailPage } from './Pages/UserVendorDetailPage';
import { isAdmin, isUser, isVendor } from './Authentication/auth';
import { UserEventPlanVendorReg } from './Pages/UserEventPlanVendorReg';
import { UserEventPlanDashboard } from './Pages/UserEventPlanDashboard';
import { UserEventPlanDashboardDetailed } from './Pages/UserEventPlanDashboardDetailed';
import { UserEventPaymentDashboard } from './Pages/UserEventPaymentsDashboard';
import { VendorPackage } from './Pages/VendorPackage';
import { VendorPayTerms } from './Pages/VendorPayTerms';
import { VendorPayTermsAddUpdate } from './Pages/VendorPayTermsAddUpdate';
import { UserPreferenceAddUpdate } from './Pages/UserPreferenceAddUpdate';
import { ResetPasswordMailingPage } from './Pages/ResetPasswordMailingPage';
import { ResetPassVerifyLinkPage } from './Pages/ResetPassVerifyLinkPage';
import { NewPasswordPage } from './Pages/NewPasswordPage';

function App() {

  return (
    <>
      <Routes>
        
        <Route exact path="/" element={isUser() && !isAdmin() ?  <Navigate to="/user/vendordashboard" /> : <LandingPage /> } />

        <Route path="/vendor/signup" element={<VendorSignupPage />} />
        <Route path="/vendor/login" element={isVendor() ? <Navigate to="/" /> : <VendorLoginPage />} />
        <Route path="/vendor/packagedetails" element={<VendorPackage />} />
        <Route path="/vendor/add/packagedetails" element={<VendorPackageAddUpdate />} />
        <Route path="/vendor/update/packagedetails" element={<VendorPackageAddUpdate />} />
        <Route path="/vendor/paymentterms" element={<VendorPayTerms />} />
        <Route path="/vendor/add/paymentterms" element={<VendorPayTermsAddUpdate />} />
        <Route path="/vendor/update/paymentterms" element={<VendorPayTermsAddUpdate />} />

        <Route path="/user/signup" element={<UserSignupPage />} />
        <Route path="/user/login" element={isUser() ? <Navigate to="/" /> : <UserLoginPage />} />
        <Route path="/user/resetpassword" element={isUser() ? <Navigate to="/" /> : <ResetPasswordMailingPage /> } />
        <Route path="/user/resetpasswordlink" element={isUser() ? <Navigate to="/" /> : <ResetPassVerifyLinkPage /> } />
        <Route path="/user/resetpassword/setnewpassword" element={isUser() ? <Navigate to="/" /> : <NewPasswordPage /> } />
      
        <Route path="/user/myfavouritevendors" element={isUser() ? <UserMyFavouriteVendors /> : <Navigate to="/" /> } />
        
        <Route path="/user/add/eventplanning" element={isUser() ? <UserEventPlanMain /> : <Navigate to="/" /> } />
        <Route path="/user/update/eventplanning" element={isUser() ? <UserEventPlanMain /> : <Navigate to="/" /> } />
        <Route path="/user/eventplandashboard" element={isUser() ? <UserEventPlanDashboard/> : <Navigate to="/" /> } />
        <Route path="/user/eventplandashboarddetailed" element={isUser() ? <UserEventPlanDashboardDetailed/> : <Navigate to="/" /> } />
        
        <Route path="/user/add/usereventplanvendorreg" element={isUser() ? <UserEventPlanVendorReg /> : <Navigate to="/" /> } />
        <Route path="/user/update/usereventplanvendorreg" element={isUser() ? <UserEventPlanVendorReg /> : <Navigate to="/" /> } />
        
        <Route path="/user/add/vendorpayment" element={isUser() ? <UserVendorPayment /> : <Navigate to="/" /> } />
        <Route path="/user/update/vendorpayment" element={isUser() ? <UserVendorPayment /> : <Navigate to="/" /> } />
        <Route path="/user/dashboard/vendorpayments" element={isUser() ? <UserEventPaymentDashboard /> : <Navigate to="/" /> } />
        
        <Route path="/user/add/preference" element={isUser() ? <UserPreferenceAddUpdate /> : <Navigate to="/" /> } />
        <Route path="/user/update/preference" element={isUser() ? <UserPreferenceAddUpdate /> : <Navigate to="/" /> } />

        <Route path="/user/vendordashboard" element={isUser() ? <UserVendorCards /> : <Navigate to="/" /> } />
        <Route path="/user/vendordashboard/detailed/:vendorId" element={isUser() ? <UserVendorDetailPage /> : <Navigate to="/" /> } />
        

        <Route path="/admin/master/eventcategory" element={isAdmin() ? <AdminEventCategory /> : <Navigate to="/" /> } />
        <Route path="/admin/master/eventservice" element={isAdmin() ? <AdminEventService /> : <Navigate to="/" /> } />
        <Route path="/admin/master/eventsubservice" element={isAdmin() ? <AdminEventSubService /> : <Navigate to="/" /> } />

      </Routes>
      
    </>
  )
}

export default App
