import React, { useEffect, useState } from 'react';
import { flatObjToTree } from '../service';

const TreeNode = ({team,setActiveNode,expandedNodes}) => {
    const { id, title, children } = team;
    return (
        <div className='team-heading'  onClick={(e) => {
            e.stopPropagation();
            setActiveNode(id)   
        }} key={id}>
            <div className='employee-heading'>{title}</div>
            {children.length && expandedNodes[id] ? children.map((d) => <TreeNode key={d.id} expandedNodes={expandedNodes} team={d} setActiveNode={setActiveNode} />) : null}
        </div>
    )
}

const MHierarchyTree = ({ team, setActiveNode, expandedNodes }) => {
    const [teamTree, setTeamTree] = useState(null);

    useEffect(() => {
        setTeamTree(flatObjToTree(team, team[1]))
    }, [team])


    return (
        teamTree ? <TreeNode expandedNodes={expandedNodes} team={teamTree} setActiveNode={setActiveNode}/> : null
    )
}

export default MHierarchyTree
