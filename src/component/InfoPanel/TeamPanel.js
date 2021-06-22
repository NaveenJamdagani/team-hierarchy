import { useContext, useState, useEffect } from "react"
import AppContext from "../../context";

const TeamPanel = () => {
    // id,name, phone_number, email_id, title, parentId
    const [name, setName] = useState('');
    const [phone_number, setNumber] = useState('');
    const [email_id, setEmail] = useState('');
    const [title, setTitle] = useState('');

    const [message, setShowMessage] = useState('');
    const [editing, setEditing] = useState(false);
    const [showAddTeam, setShowAddTeam] = useState(false);

    const { addTeamMember, deleteTeam, editNode, state } = useContext(AppContext);
    const { activeNode, userDetails, teamHierarchy } = state;
    const  id  = activeNode;

    const [details, setDetails] = useState(userDetails)

    const toggleEditMode = () => setEditing(!editing);
    const toggleAddTeamMode = () => setShowAddTeam(!showAddTeam);

    const addNewMember = () => {
        addTeamMember(name, phone_number, email_id, title);
        setName('');
        setNumber('');
        setEmail('');
        setTitle('')

        toggleAddTeamMode();
        setShowMessage('Team member added successfully!');
    }

    useEffect(() => {
        if (!message) return;

        let timerId = setTimeout(() => {
            setShowMessage('');
        }, 5000)
        return () => {
            clearTimeout(timerId)
        }
    }, [message])

    const editData = () => {
        editNode(id, details[id])
        setEditing(!editing)
    }

    return (
        <div className="info-panel-wrapper team-details">
            {showAddTeam ? (
                <>
                    <div className="header">
                        <div className="section-heading">
                            Add Team Member
                        </div>
                    </div>
                    <div className="content">
                        <div>
                            <div className='input-container'>
                                <label>
                                    Name
                                </label>
                                <input type="text" id="name" name="name" placeholder='Enter Employee Name' value={name} onChange={(e) => setName(e.target.value)} /><br />
                            </div>
                            <div className='input-container'>
                                <label>
                                    Job Title
                                </label>
                                <input type="text" id="title" name="title" placeholder='Enter Title/Position name' value={title} onChange={(e) => setTitle(e.target.value)} /><br />
                            </div>
                            <div className='input-container'>
                                <label>
                                    Phone Number
                                </label>
                                <input type="text" id="phone_number" name="phone_number" placeholder='Enter Phone number' value={phone_number} onChange={(e) => setNumber(e.target.value)} /><br />
                            </div>
                            <div className='input-container'>
                                <label>
                                    Email
                                </label>
                                <input type="text" id="email_id" name="email_id" placeholder='Enter Email Id' email_id={email_id} onChange={(e) => setEmail(e.target.value)} />
                            </div>
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
                                Object.keys(details[id]).filter(n => n !== 'id').map((key) => {
                                    return (
                                        <div key={key} className='input-container'>
                                            <label>
                                                {key.split('_').join(' ')}
                                            </label>
                                            <input type="text" 
                                                 onChange={(e) => {
                                                    setDetails({
                                                            ...details,
                                                            [details[id].id] : {
                                                                ...details[id],
                                                                [key]: e.target.value
                                                            }
                                                        })
                                                    }}  
                                                id={key} name={key} value={details[id][key]} disabled={!editing} />
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
                    <button onClick={toggleAddTeamMode}>Add Member</button>
                    <button onClick={() => deleteTeam(id, teamHierarchy[id].parentId, teamHierarchy[teamHierarchy[id].parentId].type)}>Delete</button>
                </>}
                {showAddTeam && <>
                    <button onClick={toggleAddTeamMode}>Cancel</button>
                    <button onClick={addNewMember}>Save</button>
                </>}
                {editing && <>
                    <button onClick={toggleEditMode}>Cancel</button>
                    <button onClick={editData}>Save</button>
                </>}
            </div>
        </div>
    )
}

export default TeamPanel