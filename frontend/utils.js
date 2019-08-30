const getTrueSettingsToArray = allSettings => {
    let array = [];
    for (let key in allSettings) {
        if (allSettings[key] === true) {
            array.push(key);
        }
    }
    return array;
};

export {getTrueSettingsToArray}