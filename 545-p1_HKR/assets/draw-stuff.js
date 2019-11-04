// Draw stuff
// Time-stamp: <2019-01-21 20:08:33 Chuck Siska>
// ------------------------------------------------------------

// FUN. Draw filled rect.


function draw_rect(ctx, stroke, fill) {
    stroke = stroke || 'lightgrey';
    fill = fill || 'dimgrey';
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;
    // ctx.rect(75, 50, canvas.width - 150, canvas.height - 100);
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}

// =====================================================  draw_grid ====
function draw_grid(rctx, rminor, rmajor, rstroke, rfill) {
    rctx.save();
    rctx.strokeStyle = rstroke;
    //  rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for (var ix = 0; ix <= width; ix += rminor) {
        rctx.beginPath();
        rctx.moveTo(ix, 0);
        rctx.lineTo(ix, height);
        rctx.lineWidth = (ix % rmajor == 0) ? 0.5 : 0.25;
        rctx.stroke();
        if (ix % rmajor == 0) { rctx.fillText(ix, ix, 10); }
    }
    for (var iy = 0; iy <= height; iy += rminor) {
        rctx.beginPath();
        rctx.moveTo(0, iy);
        rctx.lineTo(width, iy);
        rctx.lineWidth = (iy % rmajor == 0) ? 0.5 : 0.25;
        rctx.stroke();
        if (iy % rmajor == 0) { rctx.fillText(iy, 0, iy + 10); }
    }
    rctx.restore();
}


let w = 10;

var width = 400;
var height = 400;

var ruleset = [1, 0, 0, 1, 0, 1, 1, 0];

//setting up array and giving value to setting 0
function setup(context) {

    //createCanvas(640, 400);
    var cells = [];
    for (var i = 0; i <= width; i += 10) {
        cells[i] = [];
        for (var j = 0; j <= height; j += 10) {
            cells[i][j] = 0;
        }
    }
    // setting the left of center 200th cell as 1
    cells[0][190] = 1;
    // passing the new array cells[][] value.
    draw(cells);

}


// gives value to cells[][] determining the values of previous row by checking the cella rule 150
function draw(cells) {
    for (var ixx = 0; ixx <= height; ixx += 10) {
        for (var jyyy = 0; jyyy <= width; jyyy += 10) {
            if (ixx != 0) {
                if (jyyy == 0 || jyyy == width) {
                    if (jyyy == 0) {

                        cells[ixx][jyyy] = parseInt(rules(0, cells[ixx - 10][0], cells[ixx - 10][10]));
                    } else {

                        cells[ixx][jyyy] = parseInt(rules(cells[ixx - 10][jyyy - 10], cells[ixx - 10][jyyy], 0));
                    }

                } else {
                    cells[ixx][jyyy] = parseInt(rules(cells[ixx - 10][jyyy - 10], cells[ixx - 10][jyyy], cells[ixx - 10][jyyy + 10]));

                }
            }

        }
        // passing the stored cells[][] values to generate the coloured grid
        generate(context, cells);
    }

}

// To fill colour in the grid bsed of cells[][] values either 0 or 1
function generate(context, cells) {
    //cells[[10][180]] = 1;
    for (var ik = 0; ik <= height; ik += 10) {
        for (var jp = 0; jp <= width; jp += 10) {
            // console.log(cells[[ik][jp]]);
            if (cells[ik][jp] == 1) {
                context.rect(jp, ik, 10, 10);
                context.fill();
                context.restore();
            }
        }
    }
}

//to check the left middle and right cell to decide the values of 150 rule
function rules(a, b, c) {
    if (a == 1 && b == 1 && c == 1) return ruleset[0];
    if (a == 1 && b == 1 && c == 0) return ruleset[1];
    if (a == 1 && b == 0 && c == 1) return ruleset[2];
    if (a == 1 && b == 0 && c == 0) return ruleset[3];
    if (a == 0 && b == 1 && c == 1) return ruleset[4];
    if (a == 0 && b == 1 && c == 0) return ruleset[5];
    if (a == 0 && b == 0 && c == 1) return ruleset[6];
    if (a == 0 && b == 0 && c == 0) return ruleset[7];
    return 0;
}