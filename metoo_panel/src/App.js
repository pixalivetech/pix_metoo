import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Home";
import ListProducts from "./Pages/Products/ListProduct";
import AddProduct from "./Pages/Products/AddProduct";
import ViewProduct from "./Pages/Products/ViewProduct";
import EditProduct from "./Pages/Products/EditProduct";
import TrackYourOrder from "./Pages/Trackyourorder/Trackorder";
import Trackorderview from "./Pages/Trackyourorder/Trackorderview";
import Login from "./Pages/LoginPage/Login";
import Profile from "./Pages/Profile/Profile";
import ViewProfile from "./Pages/Profile/ViewProfile";
import OrderManagementList from "./Pages/OrderManagement/ListOrder";
import ViewOrder from "./Pages/OrderManagement/ViewOrder";
import Signup from "./Pages/Signup/Signup";
import Listreview from "./Pages/Reviews/Listreview";
import Viewreview from "./Pages/Reviews/Viewreview";
import Givereviewlist from "./Pages/Givereview/Givereviewlist";
import Givereviewview from "./Pages/Givereview/Givereviewview";
import Givereviewedit from "./Pages/Givereview/Givereviewedit";
import Addreview from "./Pages/Givereview/Addreview";

// {MasterPanel}
import Masterdashboard from "./MasterPanel/Dashboard/Masterdashboard";
import Masterproductlist from "./MasterPanel/ProductManagement/ProductList";
import MasterAddProduct from "./MasterPanel/ProductManagement/MasterAddProduct";
import MasterViewProduct from "./MasterPanel/ProductManagement/MasterViewProduct";
import MasterEditProduct from "./MasterPanel/ProductManagement/MasterEditProduct";
import MasterOrderList from "./MasterPanel/OrderManagement/OrderListMaster";
import MasterViewOrder from "./MasterPanel/OrderManagement/OrderViewMaster";
import MasterTrackOrderList from "./MasterPanel/Trackyourorder/TrackingOrderList";
import MasterTrackorderview from "./MasterPanel/Trackyourorder/TrackingOrderView";
import ContactList from "./MasterPanel/Dashboard/Contact/ContactList";
import ViewContact from "./MasterPanel/Dashboard/Contact/ViewContact";
import MasterDoctorlist from "./MasterPanel/DoctorManagement/MasterDoctorlist";
import MasterDoctorview from "./MasterPanel/DoctorManagement/MasterDoctorview";
import MasterUserlist from "./MasterPanel/UserManagement/MasterUserlist";
import MasterUserview from "./MasterPanel/UserManagement/MasterUserview";
import MasterDoctorpostlist from "./MasterPanel/PostManagement/MasterDoctorpostlist";
import MasterDoctorpostview from "./MasterPanel/PostManagement/MasterDoctorpostview";
import MasterViewProfile from "./MasterPanel/MasterProfile/MasterViewProfile";
import MasterEditprofile from "./MasterPanel/MasterProfile/MasterEditprofile";
import MasterSellerList from "./MasterPanel/SellerManagement/SellerList";
import MasterSellerView from "./MasterPanel/SellerManagement/SellerView";
import Masteradslist from "./MasterPanel/Ads Management/Masteradslist";
import Masteraddads from "./MasterPanel/Ads Management/MasterAddads";
import Mastereditads from "./MasterPanel/Ads Management/Mastereditads";
import Masterviewads from "./MasterPanel/Ads Management/Masterviewads";
import MasterListCategory from "./MasterPanel/CategoryManagement/MasterListcategory";
import MasterViewCategory from "./MasterPanel/CategoryManagement/MasterViewcategory";
import MasterAddcategory from "./MasterPanel/CategoryManagement/MasterAddcategory";
import MasterEditcategory from "./MasterPanel/CategoryManagement/MasterEditcategory";
import Masterproductreviewlist from "./MasterPanel/Productreviews/Productreviewlist";
import Masterproductreviewview from "./MasterPanel/Productreviews/Productreviewview";

// {DoctorPanel}
import DoctorDashboard from "./DoctorPanel/Dashboard/DoctorDashboard";
import DoctorAddpost from "./DoctorPanel/PostManagement/DoctorAddpost";
import DoctorPostlist from "./DoctorPanel/PostManagement/DoctorPostlist";
import DoctorEditpost from "./DoctorPanel/PostManagement/DoctorEditpost";
import DoctorViewpost from "./DoctorPanel/PostManagement/DoctorViewpost";
import DoctorUserlist from "./DoctorPanel/UserManagement/DoctorUserlist";
import DoctorUserview from "./DoctorPanel/UserManagement/DoctorUserview";
import DoctorAddprofile from "./DoctorPanel/DoctorProfile/DoctorAddprofile";
import DoctorViewprofile from "./DoctorPanel/DoctorProfile/DoctorViewprofile";
import DoctorChat from "./DoctorPanel/Q&A Management/DoctorChat";
import DoctorChatlist from "./DoctorPanel/Q&A Management/DoctorChatlist";
import UserChat from "./DoctorPanel/UserChat/UserChat";
import Signupdoctor from "./DoctorPanel/Signup/Signupdoctor";
import Userreviewlist from "./DoctorPanel/Reviews/Userreviewlist";
import Userreviewview from "./DoctorPanel/Reviews/Userreviewview";
import AppointmentList from "./MasterPanel/AppoinmentManagement/AppointmentList";
import AppointmentView from "./MasterPanel/AppoinmentManagement/AppointmentView";
import UserAppointmentList from "./DoctorPanel/AppoinmentManagement/UserAppointmentList";
import UserAppointmentView from "./DoctorPanel/AppoinmentManagement/UserAppointmentView";
import Qualification from "./DoctorPanel/DoctorProfile/Qualification";
import MasterDoctorReviewlist from "./MasterPanel/DoctorReview/MasterDoctorReviewlist";
import MasterDoctorReviewView from "./MasterPanel/DoctorReview/MasterDoctorReviewView";
import PanelReviewlist from "./MasterPanel/PanelReview/PanelReviewlist";
import PanelReviewview from "./MasterPanel/PanelReview/PanelReviewview";
import MyAppointments from "./DoctorPanel/AppoinmentManagement/Myappointment";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Companysignup" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Listproducts" element={<ListProducts />} />
          <Route path="/Addproduct" element={<AddProduct />} />
          <Route path="/Viewproduct" element={<ViewProduct />} />
          <Route path="/Editproduct" element={<EditProduct />} />
          <Route path="/Trackyourorder" element={<TrackYourOrder />} />
          <Route path="/Trackyourorderview" element={<Trackorderview />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Viewprofile" element={<ViewProfile />} />
          <Route path="/Listorder" element={<OrderManagementList />} />
          <Route path="/Vieworder" element={<ViewOrder />} />
          <Route path="/Listproductreview" element={<Listreview />} />
          <Route path="/Viewproductreview" element={<Viewreview />} />
          <Route path="/Givereviewlist" element={<Givereviewlist />} />
          <Route path="/Givereviewview" element={<Givereviewview />} />
          <Route path="/Givereviewedit" element={<Givereviewedit />} />
          <Route path="/AddReview" element={<Addreview />} />

          {/* {MasterPanel} */}
          <Route path="/Masterdashboard" element={<Masterdashboard />} />
          <Route path="/Masterproductlist" element={<Masterproductlist />} />
          <Route path="/Masteraddproduct" element={<MasterAddProduct />} />
          <Route path="/Masterviewproduct" element={<MasterViewProduct />} />
          <Route path="/Mastereditproduct" element={<MasterEditProduct />} />
          <Route path="/Masterorderlist" element={<MasterOrderList />} />
          <Route path="/Masterorderview" element={<MasterViewOrder />} />
          <Route
            path="/Mastertrackingorder"
            element={<MasterTrackOrderList />}
          />
          <Route
            path="/Mastertrackingorderview"
            element={<MasterTrackorderview />}
          />
          <Route
            path="/MasterTrackOrderList"
            element={<MasterTrackOrderList />}
          />
          <Route path="/Mastercontactlist" element={<ContactList />} />
          <Route path="/Masterviewcontact" element={<ViewContact />} />
          <Route path="/Masterviewprofile" element={<MasterViewProfile />} />
          <Route path="/MasterEditprofile" element={<MasterEditprofile />} />
          <Route path="/Masterdoctorlist" element={<MasterDoctorlist />} />
          <Route path="/Masterdoctorview" element={<MasterDoctorview />} />
          <Route path="/Masteruserlist" element={<MasterUserlist />} />
          <Route path="/Masteruserview" element={<MasterUserview />} />
          <Route
            path="/Masterdoctorpostlist"
            element={<MasterDoctorpostlist />}
          />
          <Route
            path="/Masterdoctorpostview"
            element={<MasterDoctorpostview />}
          />
          <Route path="/Mastersellerlist" element={<MasterSellerList />} />
          <Route path="/Mastersellerview" element={<MasterSellerView />} />
          <Route path="/appointmentlist" element={<AppointmentList />} />
          <Route path="/appointmentview" element={<AppointmentView />} />
          <Route path="/Masteradslist" element={<Masteradslist />} />
          <Route path="/Masteraddads" element={<Masteraddads />} />
          <Route path="/Mastereditads" element={<Mastereditads />} />
          <Route path="/Masterviewads" element={<Masterviewads />} />
          <Route path="/Mastercategorylist" element={<MasterListCategory />} />
          <Route path="/Mastercategoryview" element={<MasterViewCategory />} />
          <Route path="/Masteraddcategory" element={<MasterAddcategory />} />
          <Route path="/Mastereditcategory" element={<MasterEditcategory />} />
          <Route
            path="/Masterlistreviewproduct"
            element={<Masterproductreviewlist />}
          />
          <Route
            path="/Masterviewreviewproduct"
            element={<Masterproductreviewview />}
          />
          <Route
            path="/Masterdoctorreviewlist"
            element={<MasterDoctorReviewlist />}
          />
          <Route
            path="/Masterdoctorreviewview"
            element={<MasterDoctorReviewView />}
          />
          <Route path="/Panelreviewlist" element={<PanelReviewlist />} />
          <Route path="/Panelreviewview" element={<PanelReviewview />} />

          {/* DoctorPanel */}
          <Route path="/Doctorsignup" element={<Signupdoctor />} />
          <Route path="/Doctordashboard" element={<DoctorDashboard />} />
          <Route path="/DoctorPostlist" element={<DoctorPostlist />} />
          <Route path="/Doctoraddpost" element={<DoctorAddpost />} />
          <Route path="/DoctorEditpost" element={<DoctorEditpost />} />
          <Route path="/DoctorViewpost" element={<DoctorViewpost />} />
          <Route path="/DoctorUserlist" element={<DoctorUserlist />} />
          <Route path="/DoctorUserView" element={<DoctorUserview />} />
          <Route path="/DoctorAddprofile" element={<DoctorAddprofile />} />
          <Route path="/DoctorViewprofile" element={<DoctorViewprofile />} />
          <Route path="/Doctorchatlist" element={<DoctorChatlist />} />
          <Route path="/Doctorchat" element={<DoctorChat />} />
          <Route path="/Doctoruserchat" element={<UserChat />} />
          <Route path="/Userreviewlist" element={<Userreviewlist />} />
          <Route path="/Userreviewview" element={<Userreviewview />} />
          <Route
            path="/UserAppointmentlist"
            element={<UserAppointmentList />}
          />
          <Route
            path="/UserAppointmentview"
            element={<UserAppointmentView />}
          />
          <Route path="/EditQualification" element={<Qualification />} />
          <Route path="/Myappoinmentlist" element={<MyAppointments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
