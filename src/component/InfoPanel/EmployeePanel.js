import { useContext, useEffect, useState } from "react"
import AppContext from "../../context"

const EmployeePanel = () => {
    const { deleteTeamMember, changeTeam, state } = useContext(AppContext);
    const { teamHierarchy, userDetails, activeNode } = state;
    const { id } = activeNode;
    const [ teamList, setTeamList ] = useState([])
    const teamId = teamHierarchy[id].parentId;
    const { ownerId } = teamHierarchy[teamId];

    useEffect(() => {
        const tList = teamHierarchy[teamHierarchy[teamId].parentId].children;

        setTeamList(tList)
    },[id, teamHierarchy,teamId])


    const _changeTeam = (d) => {
        changeTeam(id,teamId, d)
    } 

    return (
        <div>
            {ownerId === id ? <button>Owner</button> : null}
            <ul>
                {
                    Object.keys(userDetails[id]).map((d, key) => {
                        return (
                            <li key={key}>
                                <span className="person-key">{d.split('_').join(' ')}:</span>
                                <span className="person-value">{userDetails[id][d]}</span>
                            </li>
                        )
                    })
                }
            </ul>
            <button onClick={() => deleteTeamMember(userDetails[id].id, teamHierarchy[userDetails[id].id].parentId, teamHierarchy[teamHierarchy[userDetails[id].id].parentId].type)}>Delete</button>

            {
                teamList.length ?
                <select onChange={(e) => _changeTeam(e.target.value)} value={teamId}>
                    {
                        teamList.map((d) => <option value={d} key={d}>{teamHierarchy[d].title}</option>)
                    }
                </select> :null
            }
        </div>
    )
}

export default EmployeePanel