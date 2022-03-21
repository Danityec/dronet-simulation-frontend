let x1 = 200
let y1 = 200
let z1 = 10
let x2 = 500
let y2 = 200
let z2 = 10
let x3 = 200
let y3 = 500
let z3 = 10
let x4 = 500
let y4 = 500
let z4 = 10

const MAX_REMOTE_VALUE = 720
const MIN_REMOTE_VALUE = 0
const MIN_SCALE_VALUE = 1.99
const MAX_SCALE_VALUE = 0.01
const MAX_SCREEN_Y_VALUE = 1200
const MIN_SCREEN_Y_VALUE = 0
const MAX_SCREEN_X_VALUE = 730
const MIN_SCREEN_X_VALUE = 0

let prevData = {
    "yaw": 0,
    "pitch": 0,
    "roll": 0,
    "throttle": 0
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const yawAxis = (yaw) => {

}

const rollPitchAxis = (roll, pitch) => {
    const pitchVal = (roll - MIN_REMOTE_VALUE) * (MAX_SCREEN_Y_VALUE - MIN_SCREEN_Y_VALUE) / (MAX_REMOTE_VALUE - MIN_REMOTE_VALUE) + MIN_SCREEN_Y_VALUE;
    const rollVal = (pitch - MIN_REMOTE_VALUE) * (MAX_SCREEN_X_VALUE - MIN_SCREEN_X_VALUE) / (MAX_REMOTE_VALUE - MIN_REMOTE_VALUE) + MIN_SCREEN_X_VALUE;

    x1 = pitchVal - (z1*8)
    y1 = rollVal - (z1*8)
    x2 = pitchVal - (z1*8)
    y2 = rollVal
    x3 = pitchVal
    y3 = rollVal - (z1*8)
    x4 = pitchVal
    y4 = rollVal
    createDrawing();

}

const throttleAxis = (throttle) => {
    const throttleVal = (throttle - MIN_REMOTE_VALUE) * (MAX_SCALE_VALUE - MIN_SCALE_VALUE) / (MAX_REMOTE_VALUE - MIN_REMOTE_VALUE) + MIN_SCALE_VALUE;

    z1 *= throttleVal
    z2 *= throttleVal
    z3 *= throttleVal
    z4 *= throttleVal
    createDrawing();
}

const createDrawing = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(x1, y1, z1, z1)
    ctx.fillRect(x2, y2, z2, z2)
    ctx.fillRect(x3, y3, z3, z3)
    ctx.fillRect(x4, y4, z4, z4)
}

ctx.fillStyle = "#FF0000";
ctx.clearRect(0, 0, canvas.width, canvas.height)
createDrawing();

async function fetchAsync() {
    let response = await fetch(`https://dronet-simulation.herokuapp.com/api/remote/send`);
    let data = await response.json();
    if(prevData.pitch == data.pitch && prevData.yaw == data.yaw && prevData.roll == data.roll && prevData.throttle == data.throttle) {
        return
    }
    else {
        console.log(data)
        if(prevData.pitch != data.pitch || prevData.roll != data.roll)
            rollPitchAxis(data.roll, data.pitch);
        if(prevData.throttle != data.throttle)      
            throttleAxis(data.throttle);
        prevData = data;
        createDrawing();
    }
}

setInterval(fetchAsync, 1000);
