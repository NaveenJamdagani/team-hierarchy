import { useContext, useReducer } from 'react';
import './App.css';
import HierarchyTree from './component/HierarchyTree';
import InfoPanel from './component/InfoPanel';


import { getAppData, setAppData } from './service/index';

import AppContext from './context';

function reducer (state, action) {
  let newState;
  switch (action.type) {
    case 'SET_ACTIVE_NODE': {
      newState = {
        ...state,
        activeNode: action.payload
      }
      break
    }

    case 'TOGGLE_NODE': {
      newState = {
        ...state,
        expandedNodes: {
          ...state.expandedNodes,
          [action.payload.id]: !state.expandedNodes[action.payload.id]
        }
      }
      break
    }

    case 'ADD_TEAM': {
      const { id, name, parentId } = action.payload
      newState = {
        ...state,
        teamHierarchy: {
          ...state.teamHierarchy,
          [id]: {
            id, children: [], title: name, type: 'team', isLocked: false, parentId
          },
          [parentId]: {
            ...state.teamHierarchy[parentId],
            children: [...state.teamHierarchy[parentId].children, id]
          }
        },
        userDetails: {
          ...state.userDetails,
          [id]: {
            id,
            name
          }
        }
      }
      break
    }

    case 'ADD_TEAM_MEMBER': {
      const { id, name, phone_number, email_id, title, parentId } = action.payload
      newState = {
        ...state,
        teamHierarchy: {
          ...state.teamHierarchy,
          [id]: {
            id, children: [], title, type: 'employee', isLocked: false, parentId
          },
          [parentId]: {
            ...state.teamHierarchy[parentId],
            children: [...state.teamHierarchy[parentId].children, id]
          }
        },
        userDetails: {
          ...state.userDetails,
          [id]: {
            id,
            name,
            phone_number,
            email_id
          }
        }
      }
      break
    }

    case 'DELETE_TEAM_MEMBER': {
      const { id, parentId, type } = action.payload;
      const teamHierarchy = Object.keys(state.teamHierarchy).reduce((acc, el) => {
        if(el !== id) {
          acc[el] = state.teamHierarchy[el]
        }
        return acc;
      }, {});

      const userDetails = Object.keys(state.userDetails).reduce((acc, el) => {
        if(el !== id) {
          acc[el] = state.userDetails[el]
        }
        return acc;
      }, {});

      newState = {
        ...state,
        teamHierarchy: {
          ...teamHierarchy,
          [parentId]: {
            ...teamHierarchy[parentId],
            children: teamHierarchy[parentId].children.filter((d) => d !== id)
          }
        },
        userDetails,
        activeNode: {
          id: parentId,
          type
        }
      }
      break
    }

    case 'DELETE_TEAM': {
      const { id, parentId, type } = action.payload;
      const idsToDelete = [id, ...state.teamHierarchy[id].children];

      const teamHierarchy = Object.keys(state.teamHierarchy).reduce((acc, el) => {
        if (!idsToDelete.includes(el)) {acc[el] = state.teamHierarchy[el]}
        return acc
      }, {})
      const userDetails = Object.keys(state.userDetails).reduce((acc, el) => {
        if (!idsToDelete.includes(el)) {acc[el] = state.userDetails[el]}
        return acc
      }, {})

      newState = {
        ...state,
        teamHierarchy: {
          ...teamHierarchy,
          [parentId]: {
            ...teamHierarchy[parentId],
            children: teamHierarchy[parentId].children.filter((d) => d !== id)
          }
        },
        userDetails,
        activeNode: {
          id: parentId,
          type
        }
      }

      break
    }

    case 'CHANGE_TEAM': {
      const { id, oldId, newId } = action.payload;
      newState = {
        ...state,
        teamHierarchy: {
          ...state.teamHierarchy,
          [oldId]: {
            ...state.teamHierarchy[oldId],
            children: state.teamHierarchy[oldId].children.filter((d) => d !== id)
          },
          [id]: {
            ...state.teamHierarchy[id],
            parentId: newId
          },
          [newId]: {
            ...state.teamHierarchy[newId],
            children: [...state.teamHierarchy[newId].children, id]
          }
        }
      }
      break
    }

    default:
      return state
  }
  setAppData(newState)
  return newState
}

const initialState = getAppData();


function App () {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { activeNode, teamHierarchy, expandedNodes } = state;

  const setActiveNode = (id, type) => {
    dispatch({
      type: 'SET_ACTIVE_NODE',
      payload: {
        id,
        type
      }
    })
    dispatch({
      type: 'TOGGLE_NODE',
      payload: {
        id
      }
    })
  }

  const addTeamMember = (name, phone_number, email_id, title) => {
    dispatch({
      type: 'ADD_TEAM_MEMBER',
      payload: {
        id: Date.now(),
        name,
        phone_number,
        email_id,
        parentId: activeNode.id,
        title
      }
    })
  }

  const addTeam = (name, id) => {
    dispatch({
      type: 'ADD_TEAM',
      payload: {
        id: Date.now(),
        name,
        parentId: id
      }
    })
  }

  const deleteTeamMember = (id, parentId,type) => {
    dispatch({
      type: 'DELETE_TEAM_MEMBER',
      payload: {
        id,parentId,type
      }
    })
  }

  const deleteTeam = (id, parentId,type) => {
    dispatch({
      type: 'DELETE_TEAM',
      payload: {
        id,parentId,type
      }
    })
  }

  const changeTeam = (id,oldId, newId) => {
    dispatch({
      type: 'CHANGE_TEAM',
      payload: {
        id,
        oldId,
        newId
      }
    })
  }

  return (
    <div className="App">
      <div className="index-panel">
        {/* <AppContext.Provider> */}
          <HierarchyTree activeNode={activeNode} expandedNodes={expandedNodes} setActiveNode={setActiveNode} team={teamHierarchy} />
        {/* </AppContext.Provider> */}
      </div>
      {activeNode && <div className="info-panel">
        <AppContext.Provider value={{addTeamMember,deleteTeamMember,addTeam,deleteTeam,changeTeam,state}}>
          <InfoPanel />
        </AppContext.Provider>
      </div>}
    </div>
  );
}

export default App;
