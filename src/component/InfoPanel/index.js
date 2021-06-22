import { useContext } from 'react';
import AppContext from '../../context';
import EmployeePanel from './EmployeePanel';
import TeamPanel from './TeamPanel';
import OwnerPanel from './OwnerPanel';
import HeadPanel from './HeadPanel'


const InfoPanel = ({ teamHierarchy, activeNode, closeInfoPanel }) => {
    let panelContent = null

    switch (teamHierarchy[activeNode].type) {
        case 'owner': {
            panelContent = <OwnerPanel />;
            break;
        }

        case 'head': {
            panelContent = <HeadPanel />;
            break;
        }

        case 'team': {
            panelContent = <TeamPanel />;
            break;
        }

        default:
            panelContent = <EmployeePanel />
    }

    return <div className="info-panel">
        <div className="info-panel-bg" onClick={closeInfoPanel}></div>
        <div className="info-panel-content">
            <div className='info-panel-header'>
                <div className='info-panel-heading'>Member Information</div>
                <div className='info-panel-close' onClick={closeInfoPanel} />
            </div>
            {panelContent}
        </div>
    </div>
}

export default InfoPanel