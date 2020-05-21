export const getCodeFilter = (item) => {
    if (!item.context) {
        return item;
    }

    if (item.context.length <= 4) {
        return item.context.map(function (i) {
            // id is in the form {index}.{id} per https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
            // this example attempts to find the `region` named `New South Wales`
            return (i.id.split('.').shift() === 'region' && i.text === 'New South Wales');
        }).reduce(function (acc, cur) {
            return acc || cur;
        });
    }
}
