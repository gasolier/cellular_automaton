let mainScreen = document.getElementById('main-screen');
let mainTable = document.getElementById('cell-table');


function change_state(y, x) {
    backendTable[y][x] = backendTable[y][x] == 1 ? 0 : 1;
    document.getElementById(y + '|' + x).style.setProperty('background-color', backendTable[y][x] == 1 ? 'green' : 'white');
}

function count_neighbours(y, x) {
    let count = 0;

    if (y - 1 > -1) {
        if (backendTable[y - 1][x] == 1) {
            count++;
        }
    }
    if (x - 1 > -1) {
        if (backendTable[y][x - 1] == 1) {
            count++;
        }
    }

    
    if (y + 1 < backendTable.length) {
        if (backendTable[y + 1][x] == 1) {
            count++;
        }
    }
    if (x + 1 < backendTable[y].length) {
        if (backendTable[y][x + 1] == 1) {
            count++;
        }
    }

    if (y - 1 > -1 && x - 1 > -1) {
        if (backendTable[y - 1][x - 1] == 1) {
            count++;
        }
    }
    if (y - 1 > -1 && x + 1 < backendTable[y].length) {
        if (backendTable[y - 1][x + 1] == 1) {
            count++;
        }
    }
    if (y + 1 < backendTable.length && x - 1 > -1) {
        if (backendTable[y + 1][x - 1] == 1) {
            count++;
        }
    }
    if (y + 1 < backendTable.length && x + 1 < backendTable[y].length) {
        if (backendTable[y + 1][x + 1] == 1) {
            count++;
        }
    }

    return count;
}

function progress() {
    let change_states = [];
    
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            let c = count_neighbours(y, x);
            if (backendTable[y][x] == 1) {
                if (survival_rules.surviveCount.indexOf(c) == -1) {
                    change_states.push([y, x]);
                }
            } else {
                if (survival_rules.birthCount.indexOf(c) != -1) {
                    change_states.push([y, x]);
                }
            }
        }
    }

    for (el of change_states) {
        change_state(el[0], el[1]);
    }

    return;
}

function fillRandomly() {
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            backendTable[y][x] = 0;
            if (Math.random() > 0.5) {
                change_state(y, x);
            } else {
                document.getElementById(y + '|' + x).style.setProperty('background-color', "white");
            }
        }
    }
}

let survival_rules = {
    birthCount : [3],
    surviveCount : [2,3]
}

let backendTable = [];
let h = 50;
let w = 50;

for (let i = 0; i < h; i++) {
    let row = document.createElement('tr');
    let bRow = [];
    for (let j = 0; j < w; j++) {
        let cell = document.createElement('td');
        
        cell.id = i + '|' + j;
        cell.classList.add('cell');
        cell.addEventListener('click', function (e) {
            change_state(i, j);
        }, false);
        
        row.appendChild(cell);
        bRow.push(0);
    }
    backendTable.push(bRow);
    mainTable.appendChild(row);
}

window.onkeydown = function(ev) {
    if (ev.keyCode == "32") {
        progress();
    } else if (ev.keyCode == "82") {
        fillRandomly();
    }
}

document.getElementById('survive').onchange = function(ev) {
    let values = document.getElementById('survive').value.split(',');
    let new_rule = [];
    for (val of values) {
        new_rule.push(parseInt(val));
    }
    survival_rules.surviveCount = new_rule;
}
document.getElementById('birth').onchange = function(ev) {
    let values = document.getElementById('birth').value.split(',');
    let new_rule = [];
    for (val of values) {
        new_rule.push(parseInt(val));
    }
    survival_rules.birthCount = new_rule;
}