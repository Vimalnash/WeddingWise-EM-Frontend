import { createContext, useContext, useEffect, useState } from "react";
import { adminurl, baseurl, userurl, vendorurl } from "../Handlers/BackendUrls";
import { getToken, isUser, isVendor } from "../Authentication/auth";


const AppCtx = createContext(null);

export function AppContext({children}) {

    const [eventCategoryList, setEventCategoryList] = useState([]);
    const [eventServiceList, setEventServiceList] = useState([]);
    const [eventSubServiceList, setEventSubServiceList] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [filterFromAmt, setFilterFromAmt] = useState(0);
    const [filterToAmt, setFilterToAmt] = useState(0);

    const [userEventPlanMainList, setUserEventPlanMainList] = useState([]);
    const [userEventPlanRegList, setUserEventPlanRegList] = useState([]);
    const [userEventPaymentList, setUserEventPaymentList] = useState([]);
    const [userAllVendorPackageList, setUserAllVendorPackageList] = useState([]);
    const [userPreferenceList, setUserPreferenceList] = useState([]);
    const [vendorPackageList, setVendorPackageList] = useState([]);
    const [vendorPayTermsList, setVendorPayTermsList] = useState([]);
    const [userFavourites, setUserFavourites] = useState([]);
    const [searchVendorName, setSearchVendorName] = useState("");
    const [searchCountry, setSearchCountry] = useState("");
    const [searchState, setSearchState] = useState("");
    const [vendorId, setVendorId] = useState("");
    const [loggedInUser, setLoggedInUser] = useState("");
    const [loggedInVendor, setLoggedInVendor] = useState("")
    const [loggedInVendorData, setLoggedInVendorData] = useState("")
    const [serviceApplyStateIds, setServiceApplyStateIds] = useState([])


    // Checking If Vendor Logged In
    const isVendorAccess = isVendor();

    // Setting state LoggedIn Vendor Name
    if (isVendorAccess) {
        useEffect(() => {
            setLoggedInVendor(JSON.parse(localStorage.getItem("vendor")).vendorName);
        }, [])
    }

    // Getting LoggedIn Vendor data
    if (isVendorAccess) {
        useEffect(() => {
            fetch(`${baseurl}/${vendorurl}/get/mymasterdata`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": getToken()
                }
            })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                if(data.error) {
                    console.log(data.error);
                } else {
                    setLoggedInVendorData(data.data)
                }
            })
        }, [])
    };

    if (isVendorAccess) {
        useEffect(() => {
            fetch(`${baseurl}/${vendorurl}/get/packagedetails`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": getToken()
                }
            })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                if(data.error) {
                    console.log(data.error);
                } else {
                    setVendorPackageList(data.data)
                }
            })
        }, [])
    };

    if (isVendorAccess) {
        useEffect(() => {
            fetch(`${baseurl}/${vendorurl}/get/paymentterms`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": getToken()
                }
            })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                if(data.error) {
                    console.log(data.error);
                } else {
                    setVendorPayTermsList(data.data)
                }
            })
        }, [])
    };


    const [show, setShow] = useState(true);
    const [editId, setEditId] = useState("");
    const [editIdx, setEditIdx] = useState("");
    const [mainEventId, setMainEventId] = useState("");
    const [paymentsFilter, setPaymentsFilter] = useState("");

    const [vendorPackageData, setVendorPackageData] = useState({
        eventServiceId: "",
        serviceAmount: "",
        serviceDescription: "",
        selectedStateId:"",
    });

    const [vendorPayTermsData, setVendorPayTermsData] = useState({
        advBookingPayPercent: "",
        onEventDatePayPercent: "",
        postEventPayPercent: "",
        payTermsDescription: "",
        cancelPolicyDescription: ""
    });

    const [userEventPlanMainData, setUserEventPlanMainData] = useState({
        eventCategoryId: "",
        stateId: "",
        cityId: "",
        date: "",
        startTime:"",
        endTime: "",
        expectedMemberCount: "",
        budgetAmount: ""
    });

    const [userEventPreferenceData, setUserEventPreferenceData] = useState({
        eventPlanMainId: "",
        preferenceDesc: ""
    });

    const [userEventPlanVendorRegData, setUserEventPlanVendorRegData] = useState({
        eventServiceId:"",
        startTime:"",
        endTime: "",
        vendorId:"",
        amount: "",
        description: "",
        registered: false,
    });

    const [userPaymentData, setUserPaymentData] = useState({
        eventPlanMainId: "",
        eventPlanVendorRegId: "",
        vendorId: "",
        payType: "",
        paidDate: "",
        amount: "",
        remarks: ""
    });

    // Checking if User LoggedIn
    const isUserAccess = isUser()
    if (isUserAccess) {
        useEffect(() => {
            if (localStorage.getItem("user")) {
                setLoggedInUser(JSON.parse(localStorage.getItem("user")).userName);
            }
        }, []);
    };

    // vendors Data
    if (isUserAccess) {
        useEffect(() => {
            fetch(`${baseurl}/${userurl}/master/get/vendors`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": getToken()
                }
            })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                if(data.error) {
                    console.log(data.error);
                } else {
                    setVendors(data.data);
                };
            })
        }, []);
    };

    // Vendor Payment Terms
    if (isUserAccess) {
        useEffect(() => {
            fetch(`${baseurl}/${userurl}/get/paymentterms`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": getToken()
                }
            })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                if(data.error) {
                    console.log(data.error);
                } else {
                    setVendorPayTermsList(data.data)
                }
            })
        }, [])
    };

    // User Favourite Vendors
    if (isUserAccess) {
        useEffect(() => {
            fetch(`${baseurl}/${userurl}/get/myfavouritevendors`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": getToken()
                }
            })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if(data.error) {
                    console.log(data.error);
                } else {
                    setUserFavourites(data.data);
                };
            })
        }, []);
    };

    // User Event Planning List
    if (isUserAccess) {
        useEffect(() => {
            fetch(`${baseurl}/${userurl}/get/eventplanning`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": getToken()
                }
            })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if(data.error) {
                    console.log(data.error);
                } else {
                    setUserEventPlanMainList(data.data);
                }
            })
        }, []);
    };

    // User Event Preference List
    if (isUserAccess) {
        useEffect(() => {
            fetch(`${baseurl}/${userurl}/get/preference`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": getToken()
                }
            })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if(data.error) {
                    console.log(data.error);
                } else {
                    setUserPreferenceList(data.data);
                }
            })
        }, []);
    };

    // User Event Vendor Wise PlanReg List
    if (isUserAccess) {
        useEffect(() => {
            fetch(`${baseurl}/${userurl}/get/eventplanningvendor`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": getToken()
                }
            })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if(data.error) {
                    console.log(data.error);
                } else {
                    setUserEventPlanRegList(data.data);
                }
            })
        }, []);
    };

    // User Event Payment to Vendors List
    if (isUserAccess) {
        useEffect(() => {
            fetch(`${baseurl}/${userurl}/get/vendorpayment`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": getToken()
                }
            })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if(data.error) {
                    console.log(data.error);
                } else {
                    setUserEventPaymentList(data.data);
                }
            })
        }, []);
    };

    // User- All Vendor Package List to show in Dashboard
    if (isUserAccess) {
        useEffect(() => {
            fetch(`${baseurl}/${userurl}/get/packagedetails`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": getToken()
                }
            })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if(data.error) {
                    console.log(data.error);
                } else {
                    setUserAllVendorPackageList(data.data);
                }
            })
        }, []);
    };

    // Event Category
    useEffect(() => {
        fetch(`${baseurl}/${adminurl}/master/get/eventcategory`, {
            method: "GET"
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            if(data.error) {
                console.log(data.error);
            } else {
                setEventCategoryList(data.data);
            }
        })
    }, []);


    // Event Services    
    useEffect(() => {
        fetch(`${baseurl}/${adminurl}/master/get/eventservice`, {
            method: "GET"
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            if(data.error) {
                console.log(data.error);
            } else {
                setEventServiceList(data.data);
            }
        })
    }, []);
    
    // Event SubServices    
    useEffect(() => {
        fetch(`${baseurl}/${adminurl}/master/get/eventsubservice`, {
            method: "GET"
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            if(data.error) {
                console.log(data.error);
            } else {
                setEventSubServiceList(data.data);
            }
        })
    }, []);

    // Countries List
    useEffect(() => {
        fetch(`${baseurl}/${adminurl}/master/get/countries`, {
            method: "GET"
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            if(data.error) {
                console.log(data.error);
            } else {
                setCountries(data.data);
            }
        })
    }, []);

    // States List
    useEffect(() => {
        fetch(`${baseurl}/${adminurl}/master/get/states`, {
            method: "GET"
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            if(data.error) {
                console.log(data.error);
            } else {
                setStates(data.data);
            }
        })
    }, []);

    // Cities List
    useEffect(() => {
        fetch(`${baseurl}/${adminurl}/master/get/cities`, {
            method: "GET"
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            if(data.error) {
                console.log(data.error);
            } else {
                setCities(data.data);
            }
        })
    }, []);


    return (
        <AppCtx.Provider value={{
            eventCategoryList, setEventCategoryList,
            eventServiceList, setEventServiceList,
            eventSubServiceList, setEventSubServiceList,
            countries,
            states, 
            cities,
            vendors,
            userFavourites, setUserFavourites,
            userEventPlanMainData, setUserEventPlanMainData,
            userEventPlanVendorRegData, setUserEventPlanVendorRegData,
            userPaymentData, setUserPaymentData,
            vendorPackageData, setVendorPackageData,
            vendorPayTermsData, setVendorPayTermsData,
            userEventPreferenceData, setUserEventPreferenceData,
            userEventPlanMainList, setUserEventPlanMainList,
            userPreferenceList, setUserPreferenceList,
            userEventPlanRegList, setUserEventPlanRegList,
            userEventPaymentList, setUserEventPaymentList,
            userAllVendorPackageList, setUserAllVendorPackageList,
            vendorPackageList, setVendorPackageList,
            vendorPayTermsList, setVendorPayTermsList,
            searchVendorName, setSearchVendorName,
            searchCountry, setSearchCountry,
            searchState, setSearchState,
            vendorId, setVendorId,
            loggedInUser, setLoggedInUser,
            loggedInVendor, setLoggedInVendor,
            loggedInVendorData, setLoggedInVendorData,
            serviceApplyStateIds, setServiceApplyStateIds,
            show, setShow, editId, setEditId, editIdx, setEditIdx,
            mainEventId, setMainEventId,
            paymentsFilter, setPaymentsFilter,
            filterFromAmt, setFilterFromAmt,
            filterToAmt, setFilterToAmt,
            }}>
            {children}
        </AppCtx.Provider>
    )
};

export function useAppContext() {
    return useContext(AppCtx)
};