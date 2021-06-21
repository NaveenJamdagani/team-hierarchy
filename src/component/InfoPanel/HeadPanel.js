import { useContext, useState } from "react"
import AppContext from "../../context"

const HeadPanel = () => {
    const { addTeam, state } = useContext(AppContext);
    const { userDetails, activeNode, teamHierarchy } = state;
    const { id } = activeNode;

    const [name, setName] = useState('');

    const addNewTeam = () => {
        teamHierarchy[id].children.forEach((d) => {
            if(teamHierarchy[d].title === name) {
                alert(`${name} already present. Please change the name.`)
            }
            else {
                addTeam(name,id);
                setName('');
            }
        })
    }
    // addTeam = (name, title)
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
                <label htmlFor="name">Team name:</label><br />
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} /><br />
            </div>
            <button onClick={() => addNewTeam()}>Add new team</button>
        </div>
    )
}

export default HeadPanel