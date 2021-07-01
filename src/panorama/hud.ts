$.Msg("Hud panorama loaded");

GameEvents.Subscribe("my_custom_event", event => {
    $.Msg("Received custom event", event);
});

GameEvents.SendCustomGameEventToServer<{}>("ui_loaded", {});

GameEvents.Subscribe("example_event", (data: NetworkedData<ExampleEventData>) => {
    const myNumber = data.myNumber;
    const myString = data.myString;

    const myBoolean = data.myBoolean; // After sending to client this is now type 0 | 1!

    const myArrayObject = data.myArrayOfNumbers; // After sending this is now an object!

    const myArray = toArray(myArrayObject); // We can turn it back into an array ourselves.

});

/**
 * Turn a table object into an array.
 * @param obj The object to transform to an array.
 * @returns An array with items of the value type of the original object.
 */
function toArray<T>(obj: Record<number, T>): T[] {
    const result = [];
    
    let key = 1;
    while (obj[key]) {
        result.push(obj[key]);
        key++;
    }

    return result;
}
