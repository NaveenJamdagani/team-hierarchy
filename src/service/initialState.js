const initialState = {
    teamHierarchy: {
        1: {id:1, children: [2, 3, 4], title: 'CEO',  type: 'owner', isLocked: true, parentId: null },
        2: {id:2, children: [], title: 'Head of Engineering',  type: 'head', isLocked: true, parentId: 1 },
        3: {id:3, children: [], title: 'Head of Staff/HR',  type: 'head', isLocked: true, parentId: 1 },
        4: {id:4, children: [5], title: 'Head of Design',  type: 'head', isLocked: true, parentId: 1 },
        5: {id:5, children: [6, 7], ownerId: 6, title: 'Team',  type: 'team', isLocked: false, parentId: 4 },
        6: {id:6, children: [], title: 'SDE 1',  type: 'employee', isLocked: false, parentId: 5 },
        7: {id:7, children: [], title: 'SDE 2',  type: 'employee', isLocked: false, parentId: 5},
    },
    userDetails: {
        1: {
            id: 1,
            name: 'Ash Ketchum',
            phone_number: "9876125431",
            email_id: 'test@gmail.com'
        },
        2: {
            id: 2,
            name: 'Misty',
            phone_number: "9876125431",
            email_id: 'test1@gmail.com',
        },
        3: {
            id: 3,
            name: 'Brock',
            phone_number: "9876125431",
            email_id: 'test2@gmail.com',
        },
        4: {
            id: 4,
            name: 'Jessie',
            phone_number: "9876125431",
            email_id: 'test3@gmail.com',
        },
        5: {
            id: 5,
            name: 'Team Rocket'
        },
        6: {
            id: 6,
            name: 'Pikachu',
            phone_number: "9876125431",
            email_id: 'cfvgh@gmail.com',
        },
        7: {
            id: 7,
            name: 'Haxorus',
            phone_number: "9876125431",
            email_id: 'ghbhg@gmail.com',
        }
    },
    activeNode: null,
    expandedNodes: {}
}

export default initialState