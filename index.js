let mainScreen = document.getElementById('main-screen');
let mainTable = document.getElementById('cell-table');
let running = false;
let interval_ref = null;


function mobileCheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

function change_state(y, x) {
    backendTable[y][x] = backendTable[y][x] == 1 ? 0 : 1;
    document.getElementById(y + '|' + x).style.setProperty('background-color', backendTable[y][x] == 1 ? ' #f2784e' : '#474d69');
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
            if (Math.random() > (1 - wallChance)) {
                change_state(y, x);
            } else {
                document.getElementById(y + '|' + x).style.setProperty('background-color', "#474d69");
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
let wallChance = 0.5;

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

// handle setting up the differences between mobile/desktop
if (mobileCheck() == true) {
    // if mobile random fill is based on shake
    document.getElementById('fill-type').innerHTML = "Shake phone to fill grid";
    var shakeEvent = new Shake({threshold: 10});
    shakeEvent.start();
    
    window.addEventListener('shake', function(){
        fillRandomly();
    }, false);

    //stop listening
    function stopShake(){
        shakeEvent.stop();
    }

    // if mobile progress is based on tap
    document.getElementById('progress-type').style.setProperty('display', 'none');
    document.getElementById('tap-progress').style.setProperty('display', 'block');
    document.getElementById('tap-progress').onclick = function () {
        if (running == true) {
            document.getElementById('progress-continuous').innerHTML = "Tap to Start";
            clearInterval(interval_ref);
            running = false;
        } else {
            interval_ref = setInterval(progress, 500);
            document.getElementById('progress-continuous').innerHTML = "Tap to Stop";
            running = true;
        }
        
    }
} else {
    // if not on mobile do everything via keyboard
    window.onkeydown = function(ev) {
        if (ev.keyCode == "32") {
            if (running) {
                document.getElementById('space-running').innerHTML = "Press space to start.";
                clearInterval(interval_ref);
                running = false;
            } else {
                document.getElementById('space-running').innerHTML = "Press space to stop.";
                interval_ref = setInterval(progress, 250);
                running = true;
            }
        } else if (ev.keyCode == "82") {
            if (running) {
                document.getElementById('space-running').innerHTML = "Press space to start.";
                clearInterval(interval_ref);
                running = false;
            }
            fillRandomly();
        } else if (ev.keyCode == "83") {
            if (running) {
                document.getElementById('space-running').innerHTML = "Press space to start.";
                clearInterval(interval_ref);
                running = false;
            }
            progress();
        }
    }
}

document.getElementById('survive').onfocus = function(ev) {
    console.log('active');
    if (running) {
        document.getElementById('space-running').innerHTML = "Press space to start.";
        clearInterval(interval_ref);
        running = false;
    }
}
document.getElementById('birth').onfocus = function(ev) {
    if (running) {
        document.getElementById('space-running').innerHTML = "Press space to start.";
        clearInterval(interval_ref);
        running = false;
    }
}

document.getElementById('survive').onchange = function(ev) {
    if (running) {
        document.getElementById('space-running').innerHTML = "Press space to start.";
        clearInterval(interval_ref);
        running = false;
    }
    let values = document.getElementById('survive').value.split(',');
    let new_rule = [];
    for (val of values) {
        new_rule.push(parseInt(val));
    }
    survival_rules.surviveCount = new_rule;
}
document.getElementById('birth').onchange = function(ev) {
    if (running) {
        document.getElementById('space-running').innerHTML = "Press space to start.";
        clearInterval(interval_ref);
        running = false;
    }
    let values = document.getElementById('birth').value.split(',');
    let new_rule = [];
    for (val of values) {
        new_rule.push(parseInt(val));
    }
    survival_rules.birthCount = new_rule;
}
document.getElementById('wall-chance-slider').onchange = function (ev) {
    wallChance = parseFloat(document.getElementById('wall-chance-slider').value);
    document.getElementById('wall-chance').innerHTML = Math.floor(wallChance * 100) + "%";
}