import initialState from './initialState';

const getAppData = () => {
    const appData = JSON.parse(localStorage.getItem('app_data'));
    
    if (appData) {
        return appData
    }
    else {
        return initialState
    }
}

const setAppData = (data) => {
    localStorage.setItem('app_data', JSON.stringify(data))
}

const flatObjToTree = (obj, head) => {
    // console.log(head)
    let responseTree = {};
    // let arrToObj = arr.reduce((acc, d) => {
    //     acc[d.id] = d;
    //     return acc
    // }, {})

    responseTree = {
        ...head,
        children: head.children.map((d) => {
            // let obj = arr.filter((c) => c.id === d)[0];
            return flatObjToTree(obj, obj[d])
        })
    }
    return responseTree
}

const treeToFlatObj = (tree) => {
    let responseArr = [];
    let childIds = [];
    let childFlatten = [];
    tree.children.forEach((d) => {
        childIds.push(d.id);
        childFlatten.push(...treeToFlatObj(d))
    })
    responseArr = [{...tree, children: childIds},...childFlatten]
    // let obj = {
    //     ...tree,
    //     children: tree.children.map((d) => d.id)
    // }
    // responseArr = [obj]
    // tree.children.forEach((d) => (responseArr = [...responseArr, ...treeToFlatObj(d)]))
    return responseArr
}

export { getAppData, setAppData, flatObjToTree, treeToFlatObj }