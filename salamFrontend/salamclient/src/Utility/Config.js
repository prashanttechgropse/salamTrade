export const storeItem = async (key, item) => {
  try {
    //we want to wait for the Promise returned by AsyncStorage.setItem()
    //to be resolved to the actual value before returning the value
    var jsonOfItem = await localStorage.setItem(key, JSON.stringify(item));
    return jsonOfItem;
  } catch (error) { }
  return;
};

//the functionality of the retrieveItem is shown below
export const retrieveItem = async key => {
  try {
    const retrievedItem = await localStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) { }
  return;
};


export const removeDuplicates = (originalArray, prop) => {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}
