import { useContext } from 'react';
import AppContext from '../../context';
import EmployeePanel from './EmployeePanel';
import TeamPanel from './TeamPanel';
import OwnerPanel from './OwnerPanel';
import HeadPanel from './HeadPanel'


const InfoPanel = () => {
    const { state } = useContext(AppContext);
    const { activeNode } = state;

    switch (activeNode.type) {
        case 'owner': 
            return <OwnerPanel />
        
        case 'head': 
            return <HeadPanel />
        
        case 'team': 
            return <TeamPanel />

        default:
            return <EmployeePanel />
    }
}

export default InfoPanel