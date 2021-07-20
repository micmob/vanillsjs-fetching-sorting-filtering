const fetchData = async () => {
    const response = await fetch(
        'https://guarded-beyond-25903.herokuapp.com/http://ws-old.parlament.ch/councillors?format=json&lang=en'
    );

    if (response.status === 200) {
        const json = await response.json();
        return json;
    }

    return -1;
};

const sortData = (data, property, order) => {
    const isAsc = order === 'asc';
    const sortData = (a, b) =>
        isAsc
            ? a[property] < b[property]
                ? -1
                : a[property] > b[property]
                ? 1
                : 0
            : a[property] < b[property]
            ? 1
            : a[property] > b[property]
            ? -1
            : 0;
    return data.sort(sortData);
};

const filters = ['id', 'lastName', 'firstName'];

const filterData = (data, keyword) =>
    data.filter(data =>
        filters.reduce(
            (acc, key) =>
                acc ||
                data[key]
                    .toString()
                    .toLowerCase()
                    .includes(keyword.toString().toLowerCase()),
            false
        )
    );

const main = async () => {
    const data = await fetchData();
    if (data === -1) {
        console.log('An error occured.');
        return;
    }
    console.log('Fetched data:', data);
    console.log('Sorted data:', sortData(data, 'id', 'asc'));
    console.log('Filtered data:', filterData(data, 'g'));
};

main();
