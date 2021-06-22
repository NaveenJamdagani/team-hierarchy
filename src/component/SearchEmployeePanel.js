import { useState, useContext, useEffect } from "react"
import AppContext from "../context";

const SearchEmployeePanel = () => {
    const [searchString, setSearchString] = useState('');
    const [searchIds, setSearchIds] = useState([]);
    const { state, setActiveNode } = useContext(AppContext);
    const { userDetails } = state;

    const setEmployeesIds = (val) => {
        setSearchString(val);
        searchEmploees(val);
    }

    const searchEmploees = (val) => {
        const ids = Object.values(userDetails).filter((d) => val && (d.name.toLowerCase().includes(val.toLowerCase()) || d.email_id?.toLowerCase().includes(val.toLowerCase()) || d.phone_number?.toLowerCase().includes(val.toLowerCase())))
        setSearchIds(ids)
    }

    return <div className="search-panel">
        <div className='input-container'>
            <input type='text' placeholder='Search... ' value={searchString} onChange={(e) => setEmployeesIds(e.target.value)} />
            {searchIds.length ?
                <ul>
                    {searchIds.map((d) => <li key={d.id} onClick={() => {
                        setActiveNode(d.id);
                        setSearchIds([])
                        setSearchString('')
                    }}>{d.name}</li>)}
                </ul>
                : null}
        </div>
    </div>
}

export default SearchEmployeePanel