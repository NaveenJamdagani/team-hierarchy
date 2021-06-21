import { useContext, useState } from "react"
import AppContext from "../../context";

const TeamPanel = () => {
    // id,name, phone_number, email_id, title, parentId
    const [name, setName] = useState('');
    const [phone_number, setNumber] = useState('');
    const [email_id, setEmail] = useState('');
    const [title, setTitle] = useState('');

    const { addTeamMember, deleteTeam, state } = useContext(AppContext);
    const { activeNode, userDetails, teamHierarchy } = state;
    const { id } = activeNode;
    const addNewMember = () => {
        addTeamMember(name,phone_number,email_id,title);
        setName('');
        setNumber(0);
        setEmail('');
        setTitle('')
    }
    return (
        <div>
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
            <div>
                <label htmlFor="name">Employee name:</label><br />
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} /><br />
                <label htmlFor="title">Title/Position name:</label><br />
                <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
                <label htmlFor="phone_number">Phone Number:</label><br />
                <input type="text" id="phone_number" name="phone_number" value={phone_number} onChange={(e) => setNumber(e.target.value)} /><br />
                <label htmlFor="email_id">Email ID:</label><br />
                <input type="text" id="email_id" name="email_id" email_id={email_id} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button onClick={() => addNewMember()}>Add team member</button>
            <button onClick={() => deleteTeam(id, teamHierarchy[id].parentId, teamHierarchy[teamHierarchy[id].parentId].type)}>Delete</button>
        </div>
    )
}

export default TeamPanel