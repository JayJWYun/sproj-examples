import { loadData, hasError } from "../utils";

export const DataLoader = async ({user}) => {
    const path = "/db/";
    const dbPath = "LCOM-GEN";
    const rawData = await loadData(path + dbPath);
    if (hasError(rawData)) return [];
    if (rawData[dbPath] === undefined) return [];
    
    let registeredItems = [];
    const dbData = rawData[dbPath];

    for (const value in dbData) {
        const targetData = dbData[value];
        const findResult = user.findIndex((value) => (value.NAME === targetData.NAME));
        if (findResult === -1)
            registeredItems.push(targetData);
        else if (!user[findResult].markAsRemoved)
            registeredItems.push(user[findResult]);
    }
        
    return registeredItems.map((value) => (value.NAME));
};

DataLoader.defaultProps = {user: []};

export const DataRawLoader = async ({user}) => {
    const path = "/db/";
    const dbPath = "LCOM-GEN";
    const rawData = await loadData(path + dbPath);
    if (hasError(rawData)) return [];
    if (rawData[dbPath] === undefined) return [];
    
    let registeredItems = [];
    const dbData = rawData[dbPath];

    for (const value in dbData) {
        const targetData = dbData[value];
        registeredItems.push({key: value, ...targetData});
    }

    if (user.length > 0) {
        for (const value of user) {
            const findResult = registeredItems.findIndex((registeredItem) => (registeredItem.key === value.key));
            if (findResult === -1)
                registeredItems.push(value);
            else {
                if (value.markAsRemoved)
                    registeredItems.splice(findResult, 1);
                else
                    registeredItems[findResult] = value;
            }
        }
    }
    
    return registeredItems;
};

DataRawLoader.defaultProps = {user: []};