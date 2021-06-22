import { useContext, useEffect, useState } from "react"
import AppContext from "../../context"

const EmployeePanel = () => {
    const { deleteTeamMember, changeTeam, editNode, state } = useContext(AppContext);
    const { teamHierarchy, userDetails, activeNode } = state;
    const id = activeNode;
    const teamId = teamHierarchy[id].parentId;
    const { ownerId } = teamHierarchy[teamId];

    const [editing, setEditing] = useState(false)
    const [teamList, setTeamList] = useState([])
    const [message, setShowMessage] = useState('');

    const [details, setDetails] = useState(userDetails)

    useEffect(() => {
        const tList = teamHierarchy[teamHierarchy[teamId].parentId].children;
        setTeamList(tList)
    }, [id, teamHierarchy, teamId])


    const _changeTeam = (d) => {
        changeTeam(id, teamId, d)
    }

    const toggleEditMode = () => setEditing(!editing)

    const editData = () => {
        editNode(id, details[id])
        setEditing(!editing)
    }

    const promoteUser = () => {
        setEditing(!editing)   
    }

    return (
        <div className="employee-details info-panel-wrapper">
            <div className="header">
                <div className="user-avatar"></div>
                {ownerId === id && <div className="user-badge">Team Head</div>}
            </div>
            <div className="content">
                {
                    Object.keys(details[id]).filter(n => n !== 'id').map((key) => {
                        return (
                            <div key={key} className='input-container'>
                                <label>
                                    {key.split('_').join(' ')}
                                </label>
                                <input
                                    onChange={(e) => {
                                    setDetails({
                                            ...details,
                                            [details[id].id] : {
                                                ...details[id],
                                                [key]: e.target.value
                                            }
                                        })
                                    }}  
                                    type="text" id={key} name={key} value={details[id][key]} disabled={!editing} />
                            </div>
                        )
                    })
                }
                <div className='input-container'>
                    <label>
                        Current Team
                    </label>
                    {
                        teamList.length ?
                            <select onChange={(e) => _changeTeam(e.target.value)} value={teamId} disabled={!editing}>
                                {
                                    teamList.map((d) => <option value={d} key={d}>{teamHierarchy[d].title}</option>)
                                }
                            </select> : null
                    }
                </div>
            </div>
            <div className="info-message">{message}</div>
            <div className='footer'>
                {editing ? <>
                    <button onClick={toggleEditMode}>Cancel</button>
                    <button onClick={editData}>Save</button>
                    {/* <button onClick={promoteUser}>Promote</button> */}
                </> : <>
                    <button onClick={toggleEditMode}>Edit</button>
                    <button onClick={() => deleteTeamMember(userDetails[id].id, teamHierarchy[userDetails[id].id].parentId, teamHierarchy[teamHierarchy[userDetails[id].id].parentId].type)}>Delete</button>
                </>}
            </div>
        </div>
    )
}

export default EmployeePanel