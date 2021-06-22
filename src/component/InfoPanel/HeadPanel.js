import { useContext, useState, useEffect } from "react"
import AppContext from "../../context"

const HeadPanel = () => {
    const { addTeam, editNode, state } = useContext(AppContext);
    const { userDetails, activeNode, teamHierarchy, } = state;

    const [details, setDetails] = useState(userDetails)

    const [name, setName] = useState('');
    const [editing, setEditing] = useState(false);
    const [showAddTeam, setShowAddTeam] = useState(false);

    const [message, setShowMessage] = useState('');

    const toggleEditMode = () => setEditing(!editing);
    const toggleAddTeamMode = () => setShowAddTeam(!showAddTeam);

    useEffect(() => {
        if (!message) return;

        let timerId = setTimeout(() => {
            setShowMessage('');
        }, 5000)
        return () => {
            clearTimeout(timerId)
        }
    }, [message])

    const addNewTeam = () => {
        let isValid = true;
        teamHierarchy[activeNode].children.forEach((d) => {
            if (userDetails[d].name === name) {
                alert(`${name} already present. Please change the name.`);
                isValid = false;
            }
        })

        if (!isValid) return;

        addTeam(name, activeNode);
        setName('');
        toggleAddTeamMode();
        setShowMessage('Team added successfully!');
    }

    const editData = () => {
        editNode(activeNode, details[activeNode])
        setEditing(!editing)
    }

    return (
        <div className="info-panel-wrapper owner-details">
            {showAddTeam ? (
                <>
                    <div className="header">
                        <div className="section-heading">
                            Add Team
                        </div>
                    </div>
                    <div className="content">
                        <div className='input-container'>
                            <label>
                                Team Name
                            </label>
                            <input type="text" id="name" name="name" placeholder='Enter Team name' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="header">
                        <div className="user-avatar"></div>
                    </div>
                    <div className="content">
                        <div>
                            {
                                Object.keys(details[activeNode]).filter(n => n !== 'id').map((key) => {
                                    return (
                                        <div key={key} className='input-container'>
                                            <label>
                                                {key.split('_').join(' ')}
                                            </label>
                                            <input type="text"
                                                onChange={(e) => {
                                                    setDetails({
                                                        ...details,
                                                        [details[activeNode].activeNode]: {
                                                            ...details[activeNode],
                                                            [key]: e.target.value
                                                        }
                                                    })
                                                }}
                                                id={key} name={key} value={details[activeNode][key]} disabled={!editing} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
            )}
            <div className="info-message">{message}</div>
            <div className='footer'>
                {!showAddTeam && !editing && <>
                    <button onClick={toggleEditMode}>Edit</button>
                    <button onClick={toggleAddTeamMode}>Add Team</button>
                </>}
                {showAddTeam && <>
                    <button onClick={toggleAddTeamMode}>Cancel</button>
                    <button onClick={addNewTeam}>Save</button>
                </>}
                {editing && <>
                    <button onClick={toggleEditMode}>Cancel</button>
                    <button onClick={editData}>Save</button>
                </>}
            </div>
        </div>
    )
}

export default HeadPanel