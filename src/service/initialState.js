const initialState = {
    teamHierarchy: {
        1: {id:1, children: [2, 3, 4], title: 'CEO',  type: 'owner', isLocked: true, parentId: null },
        2: {id:2, children: [], title: 'Head of Engineering',  type: 'head', isLocked: true, parentId: 1 },
        3: {id:3, children: [], title: 'Head of Staff/HR',  type: 'head', isLocked: true, parentId: 1 },
        4: {id:4, children: [5], title: 'Head of Design',  type: 'head', isLocked: true, parentId: 1 },
        5: {id:5, children: [6, 7], ownerId: 6, title: 'Team 1',  type: 'team', isLocked: false, parentId: 4 },
        6: {id:6, children: [], title: 'SDE 1',  type: 'employee', isLocked: false, parentId: 5 },
        7: {id:7, children: [], title: 'SDE 2',  type: 'employee', isLocked: false, parentId: 5},
    },
    userDetails: {
        1: {
            id: 1,
            name: 'Naveen',
            phone_number: 123,
            email_id: 'test@gmail.com'
        },
        2: {
            id: 2,
            name: 'Ankush',
            phone_number: 467,
            email_id: 'test1@gmail.com',
        },
        3: {
            id: 3,
            name: 'Lorum',
            phone_number: 566789,
            email_id: 'test2@gmail.com',
        },
        4: {
            id: 4,
            name: 'Ipsum',
            phone_number: 5678,
            email_id: 'test3@gmail.com',
        },
        5: {
            id: 5,
            name: 'Team 1'
        },
        6: {
            id: 6,
            name: 'Bdfggfcvh',
            phone_number: 45678,
            email_id: 'cfvgh@gmail.com',
        },
        7: {
            id: 7,
            name: 'Afcgvhghb',
            phone_number: 45678,
            email_id: 'ghbhg@gmail.com',
        },
        8: {
            id: 8,
            name: 'Bdfggf',
            phone_number: 456789,
            email_id: 'dfxcgvhbnj@gmail.com',
        }
    },
    activeNode: null,
    expandedNodes: {
      1: true  
    }
}

export default initialState