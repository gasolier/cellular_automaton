onmessage = function (ev) {
    function count_neighbours(y, x) {
        let count = 0;

        let y_1 = y - 1 > - 1 ? y - 1 : tableSize + (y - 1);
        let x_1 = x - 1 > - 1 ? x - 1 : tableSize + (x - 1);

        let y_2 = y + 1 < tableSize ? y + 1 : tableSize - (y + 1);
        let x_2 = x + 1 < tableSize ? x + 1 : tableSize - (x + 1);

        if (backendTable[y_1][x] == 1) {
            count++;
        }
        if (backendTable[y][x_1] == 1) {
            count++;
        }
        if (backendTable[y_2][x] == 1) {
            count++;
        } 
        if (backendTable[y][x_2] == 1) {
            count++;
        }
        if (backendTable[y_1][x_1] == 1) {
            count++;
        }
        if (backendTable[y_1][x_2] == 1) {
            count++;
        }
        if (backendTable[y_2][x_1] == 1) {
            count++;
        }
        if (backendTable[y_2][x_2] == 1) {
            count++;
        }

        return count;
    }

    let evData = ev.data;
    
    let backendTable = evData.bTable;
    let y = evData.y;
    let x = evData.x;
    let tableSize = evData.tableSize;

    let c = count_neighbours(y,x);

    postMessage({c : c, y : y, x : x});
}