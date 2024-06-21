import { useAppContext } from "../Context/AppContext";

function SearchBar() {
    const { searchVendorName, setSearchVendorName,
        searchState, setSearchState, countries, states,
        searchCountry, setSearchCountry
    } = useAppContext();

    return (
        <div className="p-2 text-white text-center bg-opacity-75 page-header">
            <div className="d-flex flex-sm-nowrap flex-row justify-center align-content-center flex-wrap gap-2">
                <div className="mb-2">
                    <label for="exampleInputcountryId" className="form-label">Select Country</label>
                    <select 
                        className="form-select" 
                        aria-label="Default select example"
                        value={searchCountry}
                        onChange={(e) => setSearchCountry(e.target.value)}
                    >
                        <option></option>
                            {
                                countries.map((country, index) => {
                                    return <option key={index} value={country._id}>{country.countryName}</option>
                                })
                            }
                    </select>
                </div>
                <div className="mb-2">
                    <label for="exampleInputstateId" className="form-label">Select State</label>
                    <select 
                        className="form-select" 
                        aria-label="Default select example"
                        value={searchState}
                        onChange={(e) => setSearchState(e.target.value)}
                    >
                            <option></option>
                            {
                                states
                                .filter((data) => data.countryId._id == searchCountry)
                                .map((state, index) => {
                                    return <option key={index} value={state._id}>{state.stateName}</option>
                                })
                            }
                    </select>
                </div>
                <div className="mb-2">
                    <label for="exampleInputvendor" className="form-label">Search VendorName</label>
                    <input 
                        className="form-control me-2" 
                        type="search" 
                        placeholder="Search Vendor" 
                        aria-label="Search"
                        value={searchVendorName}
                        onChange={(e) => setSearchVendorName(e.target.value)}
                    />
                </div>

            </div>
        </div>
    )
};

export { SearchBar }