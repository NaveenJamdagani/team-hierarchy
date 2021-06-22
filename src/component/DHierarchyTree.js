import React, { useContext, useEffect, useRef, useState } from 'react';
import AppContext from '../context';
import { flatObjToTree } from '../service';
import ellipsis from '../asset/ellipsis.png'

const TreeNode = ({ team, setActiveNode, expandedNodes, toggleNode }) => {
    const { state } = useContext(AppContext);
    const { id, title, children } = team;
    const cardRef = useRef();
    return (
        <div className='tree-node'>
            <div className='tree-node-card' ref={cardRef} onClick={(e) => {
                e.stopPropagation();
                toggleNode(id)

                // setTimeout(() => {
                //     cardRef.current.scrollIntoView();
                // },500)
            }}>
                <div className='tree-node-avatar'>

                </div>
                <div className='tree-node-details'>
                    <div className='tree-node-actions' >
                        <img onClick={(e) => {
                            e.stopPropagation();
                            setActiveNode(id);
                        }}
                            src={ellipsis} alt='' height={25} width={25} />
                    </div>
                    <h3>{state.userDetails[id].name}</h3>
                    <p>{title}</p>
                </div>
            </div>
            {children.length && expandedNodes[id] ?
                <div className='tree-node-children'>
                    {children.map((d) =>
                        <TreeNode key={d.id} expandedNodes={expandedNodes} team={d} setActiveNode={setActiveNode} toggleNode={toggleNode} />)}
                </div>
                : null}
        </div>
    )
}

const DHierarchyTree = ({ team, setActiveNode, expandedNodes, toggleNode }) => {
    const [teamTree, setTeamTree] = useState(null);

    useEffect(() => {
        setTeamTree(flatObjToTree(team, team[1]))
    }, [team])


    return (
        teamTree ? <TreeNode expandedNodes={expandedNodes} toggleNode={toggleNode} team={teamTree} setActiveNode={setActiveNode} /> : null
    )
}

export default DHierarchyTree
