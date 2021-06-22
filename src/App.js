import { useReducer } from 'react';
import './App.css';
import DHierarchyTree from './component/DHierarchyTree';
import InfoPanel from './component/InfoPanel';


import { getAppData, setAppData } from './service/index';

import AppContext from './context';
import SearchEmployeePanel from './component/SearchEmployeePanel';

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
      const childNodes = state.teamHierarchy[action.payload.id].children;

      childNodes.forEach((d) => {
        delete state.expandedNodes[d]
      })
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
            id, children: [], title: 'Team', type: 'team', isLocked: false, parentId
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
        if (el !== id) {
          acc[el] = state.teamHierarchy[el]
        }
        return acc;
      }, {});

      const userDetails = Object.keys(state.userDetails).reduce((acc, el) => {
        if (el !== id) {
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
        activeNode: parentId,
      }
      break
    }

    case 'DELETE_TEAM': {
      const { id, parentId, type } = action.payload;
      const idsToDelete = [id, ...state.teamHierarchy[id].children];

      const teamHierarchy = Object.keys(state.teamHierarchy).reduce((acc, el) => {
        if (!idsToDelete.includes(el)) { acc[el] = state.teamHierarchy[el] }
        return acc
      }, {})
      const userDetails = Object.keys(state.userDetails).reduce((acc, el) => {
        if (!idsToDelete.includes(el)) { acc[el] = state.userDetails[el] }
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
        activeNode: parentId
      }

      break
    }

    case 'EDIT_NODE': {
      const { id, data } = action.payload;
      newState = {
        ...state,
        userDetails: {
          ...state.userDetails,
          [id]: data
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

  const setActiveNode = (id) => {
    dispatch({
      type: 'SET_ACTIVE_NODE',
      payload: id
    })
  }

  const closeInfoPanel = () => {
    dispatch({
      type: 'SET_ACTIVE_NODE',
      payload: null
    })
  }

  const toggleNode = (id) => {
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
        parentId: activeNode,
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

  const deleteTeamMember = (id, parentId, type) => {
    dispatch({
      type: 'DELETE_TEAM_MEMBER',
      payload: {
        id, parentId, type
      }
    })
  }

  const deleteTeam = (id, parentId, type) => {
    dispatch({
      type: 'DELETE_TEAM',
      payload: {
        id, parentId, type
      }
    })
  }

  const editNode = (id, data) => {
    dispatch({
      type: 'EDIT_NODE',
      payload: {
        id, data
      }
    })
  }

  const changeTeam = (id, oldId, newId) => {
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
      <AppContext.Provider value={{ addTeamMember, deleteTeamMember, addTeam, deleteTeam, changeTeam, editNode,setActiveNode, state }}>
        <SearchEmployeePanel />
        <div className="index-panel">
          <DHierarchyTree toggleNode={toggleNode} activeNode={activeNode} expandedNodes={expandedNodes} setActiveNode={setActiveNode} team={teamHierarchy} />
        </div>
        {activeNode && <InfoPanel teamHierarchy={teamHierarchy} activeNode={activeNode} closeInfoPanel={closeInfoPanel} />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
