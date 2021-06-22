import { useState, useContext, useEffect } from "react"
import AppContext from "../../context"

const OwnerPanel = () => {
    const { state, editNode } = useContext(AppContext);
    const { userDetails, activeNode } = state;
    const id = activeNode;

    const [editing, setEditing] = useState(false);
    const [message, setShowMessage] = useState('');
    const [details, setDetails] = useState(userDetails)

    const showReadMode = () => {
        setDetails(userDetails)
        setEditing(!editing)
    }

    const showEditMode = () => {
        setEditing(!editing)
    }

    const editData = () => {
        editNode(id, details[id])
        setEditing(!editing)
    }
    
    return (
        <div className="info-panel-wrapper owner-details">
            <div className="header">
                <div className="user-avatar"></div>
            </div>
            <div className="content">
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
                                    id={key} name={key} value={details[id][key]} disabled={!editing}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className="info-message">{message}</div>
            <div className='footer'>
                {editing ? <>
                    <button onClick={showReadMode}>Cancel</button>
                    <button onClick={editData}>Save</button>
                </> : <button onClick={showEditMode}>Edit</button>}
            </div>
        </div>
    )
}

export default OwnerPanel