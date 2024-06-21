import { baseurl, userurl, vendorurl } from "../Handlers/BackendUrls"

// Handling the user signup functionality
async function handleUserSignup(userSignupPayload) {
    const res = await fetch(`${baseurl}/${userurl}/signup`, {
        method: "POST",
        body: JSON.stringify(userSignupPayload),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();
    return data;
};

// Hanlding User to Login
async function handleUserLogin(loginPayload) {
    const res = await fetch(`${baseurl}/${userurl}/login`, {
        method: "POST",
        body: JSON.stringify(loginPayload),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();
    return data;
};

// Handling User to Logout
function handleUserLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("vendor")
    location.reload();
};

// Handling Vendor Signup to Portal
async function handleVendorSignup(vendorSignupPayload) {
    const res = await fetch(`${baseurl}/${vendorurl}/signup`, {
        method: "POST",
        body: JSON.stringify(vendorSignupPayload),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();
    return data;
};

// Hanlding Vendor to Login to Portal
async function handleVendorLogin(vendorLoginPayload) {
    const res = await fetch(`${baseurl}/${vendorurl}/login`, {
        method: "POST",
        body: JSON.stringify(vendorLoginPayload),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json();
    return data;
};

// Handling Vendor Logout
function handleVendorLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("vendor")
    location.reload();
};

// Verifying the Logged in user/vendor to access the forms
function isAccessible() {
    if(localStorage.getItem("token")) {
        return true;
    } else {
        return false;
    }
};

// Verifying the logged in user
function isUser() {
    if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user.userName) {
            return true;
        } else {
            return false;
        }
    }
};

// Verigying whether the user is admin to get admin forms
function isAdmin() {
    if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user.isAdmin) {
            return true;
        } else {
            return false;
        }
    }
};

// Verifying the logged in vendor
function isVendor() {
    if (localStorage.getItem("vendor")) {
        const vendor = JSON.parse(localStorage.getItem("vendor"));
        if(vendor.userName) {
            return true;
        } else {
            return false;
        }
    }
};

// Getting the logged i user/vendor authenticated token
function getToken() {
    return localStorage.getItem("token")
};

export { 
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
    isAccessible,
    isUser,
    isAdmin,
    isVendor,
    handleVendorSignup,
    handleVendorLogin,
    handleVendorLogout,
    getToken
};