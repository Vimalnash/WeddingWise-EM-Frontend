# WeddingWise-EM-Frontend
Used Reactjs, Bootstrap and Custom CSS

Authentication Layers Applied
    -> Admin Login
    -> User Login
    -> Vendor Login
  ->Check credentials.txt file to login

Admin WorkAround
    -> User Menu
        -> Login Using admin Credentials.
    -> Admin Menu
        -> Event Category   -> Like Wedding, Reception, PreWedding, etc..
        -> Event Services   -> Photography, Catering, Travel, OverallEventManageLtds, etc...

Vendor WorkAround (To Update Their Basic Package details)

    -> Vendors-BusinessSignup Menu
        -> Signup Using New Credentials.
        -> Login using already Signedup credentials.

    -> Vendor Menu

        -> View Main Package Details
            -> Vendor Shall Add 1 Main/Base PackageDetails to display in users vendor dashboard.
            -> Edit any no of times.

        ->  View Payment Terms
            -> Vendor Shall Add 1 Payment Terms to show users.
            -> Edit any no of times.

User WorkAround (To Plan their events)
    -> User Menu
        -> Signup Using New Credentials.
        -> Login using already Signedup credentials.

    -> VendorSearch
        -> Displays Vendor Basic Detail Cards
            -> Click View Detail to show Detailed View of the Vendor services.
            -> Use "Add to Favourites" and "Remove from Favourites".

    -> Plan-Register-Pay
        -> My Favourite Vendors     -> Displays Vendor Cards Which added to your Favourites.
        -> Event Plan Main Details  -> Form To Input Main Event Plan Details.
        -> Dashbord - Event Plan    -> Displays Main Events Only.
        -> Dashboard - Event Plan Detailed View
            -> Detailed View of the Event.
            -> Edit -> Edit to edit the Main plandetails.
            -> Del  -> Delete is Disabled When Vendor is Planned.

            -> PlanVendor
                -> Plan different Vendors for the event services like Photography, Catering, Travelarrangements, Hall,..

            -> PlanEventPreference
                -> User Preference Description input for the event regarding.

            -> User Preference cards View
                -> Shall Edit and Delete.

            -> Planned Vendor Details Cards View
                -> Edit -> Disabled when Registered Checked.
                -> Del  -> Disabled when Registered Checked.
                -> RaisePayment 
                    -> Enabled When Registered.
                    -> Payment Made details input.
                -> ViewPayments 
                    -> Enabled When Registered.
                    -> Dashboard Cards View for the payments made for that particular vendor.
                    -> Edit -> Payments made shall be edited.
                    -> Del  -> Payments made shall be deleted.

            -> Event Summary View
                -> Planned Basis.
                -> Confirmed/Registerd Basis.
            
