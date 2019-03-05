function program1() {

    var W = 14, H = 14;     // image sizes
    var N = 6000;           // num of training data
    var ETA = 0.01;         // learning rate 
    var NUM_TRAIN = 500;    // num of iterations
    var NUM_INPUT = W * H;  // num units of input layer
    var NUM_HIDDEN = 50;    // num units of hidden layer
    var NUM_OUTPUT = W * H; // num units of output layer

    /**
     * main() of test program
     *
     * variable names example:
     * n     : index of training data
     * t     : correct answer data (teacher?)
     * x,z,y : values of input,hidden,output layer (*order is important*)
     * i,j,k : index for units of input,hidden,output layer
     * w1,w2 : weights for input-to-hidden, hidden-to-output layer
     */
    (function main() {
        document.getElementById('result1').innerText = '';

        // 学習DATA(入力、正解) & 検証用DATA の作成。
        var xlist = []; // 入力画像[N][14*14]
        var tlist = []; // 正解数値[N][10] (from 0 to 9)
        for (var n = 0; n < N; ++n) {
            xlist[n] = amul(TRAIN_PIXELS[n], 1 / 255); // normalize pixel value 0~255->0~1
            tlist[n] = amul(TRAIN_PIXELS[n], 1 / 255); // normalize pixel value 0~255->0~1
        }

        // initializing weights with random values
        var w1 = arand(NUM_HIDDEN, NUM_INPUT);  // w1[NUM_HIDDEN][NUM_INPUT]
        var w2 = arand(NUM_OUTPUT, NUM_HIDDEN); // w2[NUM_OUTPUT][NUM_HIDDEN]
        logcat('Error before training: e=' + calcError(xlist, tlist, w1, w2) + '\n');

        // recursive training & recognizing
        (function trainAndRecognize(loop) {

            // trains with training data
            for (var n = 0; n < N; ++n) {
                train(xlist[n], tlist[n], w1, w2);
            }

            // visualize weight w1 in hidden layer
            var ctx1 = initCanvas('canvas1', 0.5);
            for (var j = 0; j < NUM_HIDDEN; ++j) {
                var x = (j % 10) * (W + 1);
                var y = Math.floor(j / 10) * (H + 1);
                drawW1j(ctx1, x, y, w1[j]);
            }

            // 学習DATAで認識して結果を可視化。
            if (loop % 10 == 0) {
                var ctx2 = initCanvas('canvas2', 0.5);
                for (var n = 0; n < Math.min(N, 100); ++n) {
                    var val = recognize(xlist[n], w1, w2);
                    var x = (n % 10) * (W + 1);
                    var y = Math.floor(n / 10) * (H + 1);
                    drawOutput(ctx2, x, y, val.y);
                }
            }
            logcat('Error in training #' + loop + ': e=' + calcError(xlist, tlist, w1, w2) + '\n');

            // 表示を反映するためsetTimeout()でyieldする。
            if (loop < NUM_TRAIN) {
                setTimeout(function() {trainAndRecognize(loop + 1);}, 1);
            }
        })(0);
    })();

    /********************
     * TRAINING
     * updates w1,w2
     * @return null
     */
    function train(x, t, w1, w2) {

        // (1)calculate output x,y,z by forward propagation

        var val = recognize(x, w1, w2);

        // (2)calculate error by back propagation
        var d1 = azero(NUM_OUTPUT); //error δ (init to 0)
        var d2 = azero(NUM_HIDDEN);
        for (var k = 0; k < NUM_OUTPUT; ++k) { //output layer: δ1=y-t
            d1[k] = val.y[k] - t[k];
        }
        for (var j = 0; j < NUM_HIDDEN; ++j) { //hidden layer: δ2=f'(z)Σw2･δ1
            var temp = 0;
            for (var k = 0; k < NUM_OUTPUT; ++k) {
                temp += w2[k][j] * d1[k];
            }
            d2[j] = val.z[j] * (1 - val.z[j]) * temp; // sigmoid() case
            //d2[j] = (1 - val.z[j] * val.z[j]) * temp; // tanh() case
        }

        // (3)update the weights
        for (var j = 0; j < NUM_HIDDEN; ++j) { //input layer: w1 = w1 - ETA･δ2･x
            for (var i = 0; i < NUM_INPUT; ++i) {
                w1[j][i] -= ETA * d2[j] * x[i];
            }
        }
        for (var k = 0; k < NUM_OUTPUT; ++k) { //hidden layer: w2 = w2 - ETA･δ1･z
            for (var j = 0; j < NUM_HIDDEN; ++j) {
                w2[k][j] -= ETA * d1[k] * val.z[j];
            }
        }
    }

    /*****************************
     * RECOGNITION
     * calculate output values y,z by forward propagation
     * @return {y:[], z:[]}
     */
    function recognize(x, w1, w2) {
        var z = azero(NUM_HIDDEN); // hidden layer values (init to 0s)
        var y = azero(NUM_OUTPUT); // output layer values (init to 0s)

        //calculate hidden layer values: z=f(Σw1･x)
        for (var j = 0; j < NUM_HIDDEN; ++j) {
            var a = 0;
            for (var i = 0; i < NUM_INPUT; ++i) {
                a += w1[j][i] * x[i];
            }
            z[j] = 1 / (1 + Math.exp(-a)); // sigmoid()の場合。
            //z[j] = Math.tanh(a);           // tanh()の場合。
        }

        //calculate output layer values: y=Σw2･z
        for (var k = 0; k < NUM_OUTPUT; ++k) {
            for (var j = 0; j < NUM_HIDDEN; ++j) {
                y[k] += w2[k][j] * z[j];
            }
        }
        return {y:y, z:z};
    }

    /**
     * Compute the Error Sum of Squares(SSE): e=1/2Σ(y-t)^2
     */
    function calcError(xlist, tlist, w1, w2) { 
        var error = 0;
        for (var n = 0; n < N; ++n) {
            var val = recognize(xlist[n], w1, w2);
            for (var k = 0; k < NUM_OUTPUT; ++k) {
                error += 0.5 * (val.y[k] - tlist[n][k]) * (val.y[k] - tlist[n][k]); // 1/2(y-t)^2
            }
        }
        return error;
    }

    /*******************************************
     * SUBROUTINE
     ******************************************/
    // returns zero-filled array
    function azero(len) {
        var dst = [];
        for (var i = 0; i < len; ++i) {
            dst[i] = 0;
        }
        return dst;
    }

    // returns 2D array filled with random values (-1~1)
    function arand(N, I) {
        var dst = [];
        for (var n = 0; n < N; ++n) {
            dst[n] = [];
            for (var i = 0; i < I; ++i) {
                dst[n][i] = Math.random() * 2 - 1;
            }
        }
        return dst;
    }

    // scalar multiplication to an array
    function amul(src, num) {
        var dst = [];
        for (var i = 0; i < src.length; ++i) {
            dst[i] = src[i] * num;
        }
        return dst;
    }

    // output to textarea
    function logcat(str) {
        document.getElementById('result1').innerText =
            str + document.getElementById('result1').innerText;
    }

    // canvas initialization
    function initCanvas(id, scale) {
        var canvas = document.getElementById(id); // prepare canvas context
        canvas.width = canvas.offsetWidth * scale; // 論理サイズを設定。
        canvas.height = canvas.offsetHeight * scale;
        return canvas.getContext('2d');
    }

    // drawing weights in input-to-hidden layer to canvas
    function drawW1j(ctx, x, y, w1j) {
        var data = ctx.createImageData(W, H);
        for (var i = 0; i < W * H; ++i) {
            data.data[i * 4 + 0] =
            data.data[i * 4 + 1] =
            data.data[i * 4 + 2] = w1j[i] * 192 + 128; // 実際に試してみて見やすい値を設定。
            data.data[i * 4 + 3] = 255;
        }
        ctx.putImageData(data, x, y);
    }

    // drawing output to canvas
    function drawOutput(ctx, x, y, w1j) {
        var data = ctx.createImageData(W, H);
        for (var i = 0; i < W * H; ++i) {
            data.data[i * 4 + 0] =
            data.data[i * 4 + 1] =
            data.data[i * 4 + 2] = w1j[i] * 128 + 128; // 実際に試してみて見やすい値を設定。
            data.data[i * 4 + 3] = 255;
        }
        ctx.putImageData(data, x, y);
    }
}


/**
 * onload handler
 */
onload = function() {

    //show program1
    //document.getElementById('program1').innerText = program1;
}

