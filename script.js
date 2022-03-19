let x1 = 0
let y1 = 0
let z1 = 10
let x2 = 100
let y2 = 0
let z2 = 10
let x3 = 0
let y3 = 100
let z3 = 10
let x4 = 100
let y4 = 100
let z4 = 10

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const scaleImg = (z) => {
    const roundZ = Math.round(z)
    z1 += roundZ
    z2 += roundZ
    z3 += roundZ
    z4 += roundZ
}

const translateImg = (x, y) => {
    const roundX = Math.round(x)
    const roundY = Math.round(y)
    x1 += roundX
    y1 += roundY
    x2 += roundX
    y2 += roundY
    x3 += roundX
    y3 += roundY
    x4 += roundX
    y4 += roundY
}

const createDrawing = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(x1, y1, z1, z1)
    ctx.fillRect(x2, y2, z2, z2)
    ctx.fillRect(x3, y3, z3, z3)
    ctx.fillRect(x4, y4, z4, z4)
}

ctx.fillStyle = "#FF0000";

fetch(`https://dronet-simulation.herokuapp.com/api/remote/get`)
    .then(response => response.json())
    .then(result => {
        translateImg(result.x, result.y);
        scaleImg(result.z);
        createDrawing();
    })