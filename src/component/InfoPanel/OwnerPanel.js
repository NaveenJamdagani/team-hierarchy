import { useContext } from "react"
import AppContext from "../../context"

const OwnerPanel = () => {
    const { state } = useContext(AppContext);
    const { userDetails, activeNode } = state;
    const { id } = activeNode;
    
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
        </div>
    )
}

export default OwnerPanel