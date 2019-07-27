var formStateName = 'data-form-state';
var formStateEls = $('[' + formStateName + ']');
formStateEls.hide();
$('form').submit(function (e) {
    e.preventDefault();
    var form = $(this);
    var action = (this.getAttribute('action') || '').trim();
    var formData = new FormData(this);
    var chkSelected = {};
    var name = this.getAttribute('name');
    name && formData.append('__name', name);

    form.find('[type=radio], [type=checkbox]').each(function (item) {
        var chkName = this.name;
        if (this.checked) {
            chkSelected[chkName] = 1;
            return;
        }
        chkSelected[chkName] = 0;
    });

    for (var chk in chkSelected) {
        if (!chkSelected[chk]) {
            formData.append(chk, '');
        }
    }

    $.ajax({
        url: action,
        method: 'POST',
        processData: false,
        contentType: false,
        data: formData,
    }).done(function (data) {
        formStateEls.hide();
        form.find('> *').fadeOut();
        form.find('[' + formStateName + '=success]').stop(1).fadeIn();
    }).fail(function (data) {
        formStateEls.hide();
        form.find('[' + formStateName + '=error]').stop(1).fadeIn().delay(3000).fadeOut();
    });
});


 // Create new wheel object specifying the parameters at creation time.
 let dinnerWheel = new Winwheel({
    'canvasId': 'canvas1',
    'numSegments': 8,                 // Specify number of segments.
    'outerRadius': 200,               // Set outer radius so wheel fits inside the background.
    'drawText': true,              // Code drawn text can be used with segment images.
    'textFontSize': 18,
    'textOrientation': 'curved',
    'textAlignment': 'inner',
    'textMargin': 170,
    'textFontFamily': 'monospace',
    'textStrokeStyle': 'white',
    'textLineWidth': 3,
    'textFillStyle': 'black',
    'drawMode': 'segmentImage',    // Must be segmentImage to draw wheel using one image per segemnt.
    'segments':                    // Define segments including image and text.
        [
            { 'image': 'Pizza.png', 'text': 'Pizza' },
            { 'image': 'Burgers.png', 'text': 'Burgers' },
            { 'image': 'Steakhouse.png', 'text': 'Steakhouse' },
            { 'image': 'Italian.png', 'text': 'Italian' },
            { 'image': 'Mexican.png', 'text': 'Mexican' },
            { 'image': 'BBQ.png', 'text': 'BBQ' },
            { 'image': 'Chinese.png', 'text': 'Chinese' },
            { 'image': 'Seafood.png', 'text': 'Seafood' }
        ],
    'animation':           // Specify the animation to use.
    {
        'type': 'spinToStop',
        'duration': 5,     // Duration in seconds.
        'spins': 8,     // Number of complete spins.
        'callbackFinished': 'alertPrize()'
    }
});


let movieWheel = new Winwheel({
    'canvasId': 'canvas2',
    'numSegments': 8,                 // Specify number of segments.
    'outerRadius': 200,               // Set outer radius so wheel fits inside the background.
    'drawText': true,              // Code drawn text can be used with segment images.
    'textFontSize': 18,
    'textOrientation': 'curved',
    'textAlignment': 'inner',
    'textMargin': 170,
    'textFontFamily': 'monospace',
    'textStrokeStyle': 'white',
    'textLineWidth': 3,
    'textFillStyle': 'black',
    'drawMode': 'segmentImage',    // Must be segmentImage to draw wheel using one image per segemnt.
    'segments':                    // Define segments including image and text.
        [
            { 'image': '1365.png', 'text': 'Action' },
            { 'image': '6548.png', 'text': 'Comedy' },
            { 'image': '5763.png', 'text': 'Drama' },
            { 'image': '1492.png', 'text': 'Fantasy' },
            { 'image': '8711.png', 'text': 'Horror' },
            { 'image': '6839.png', 'text': 'Musical' },
            { 'image': '8933.png', 'text': 'Thriller' },
            { 'image': '8883.png', 'text': 'Western' }
        ],
    'animation':           // Specify the animation to use.
    {
        'type': 'spinToStop',
        'duration': 5,     // Duration in seconds.
        'spins': 8,     // Number of complete spins.
        'callbackFinished': 'alertPrize99()'
    }
});

// Vars used by the code in this page to do power controls.
let wheelSpinning = false;

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin() {
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false) {
        dinnerWheel.startAnimation();
        wheelSpinning = true;
    }
}

function startSpin99() {
    // Ensure that spinning can't be clicked again while already running
    // Based on the power level selected adjust the number of spins for the wheel, the more times is has
    // to rotate with the duration of the animation the quicker the wheel spins.
    // Begin the spin animation by calling startAnimation on the wheel object.
    movieWheel.startAnimation()

}

function resetWheel() {
    dinnerWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    dinnerWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    dinnerWheel.draw();                // Call draw to render changes to the wheel.

    wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
}

function resetWheel99() {
    movieWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    movieWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    movieWheel.draw();

    wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
}

function alertPrize() {
    // Get the segment indicated by the pointer on the wheel background which is at 0 degrees.
    var winningSegment = dinnerWheel.getIndicatedSegment();
    console.log(winningSegment);
    console.log(winningSegment.image.slice(0, -4));

    var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=Seattle&categories=" + winningSegment.text.toLowerCase();
    console.log(winningSegment.text);
    console.log(myurl);
    const x = Math.floor(Math.random() *5);

    var timeout = function () {
        $.ajax({
            url: myurl,
            headers: {
                'Authorization': 'Bearer 18DH8r28FEUJwr6hOcm5V8xMjrbHpLCfMg1Zp0T_N65S4sJfrhguMmC6JccNZHK0GiGXK05xPcWziGkUF-GBLbKqCklnalVxvk1sp9GmYpAGU_nZtEY2WkjYysErXXYx',
            },
            method: 'GET',
            dataType: 'json',

        }).done(function (response) {
            console.log(response.businesses[x].name);
            alert(response.businesses[x].name);
            var tRow = $("<tr>");

            // Methods run on jQuery selectors return the selector they we run on
            // This is why we can create and save a reference to a td in the same statement we update its text
            var titleTd = $("<td>").text(response.businesses[x].name);

            // Append the newly created table data to the table row
            tRow.append(titleTd);
            // Append the table row to the table body
            $(".dinner").append(tRow);

        });
    };
    setTimeout(timeout, 500);
}


function alertPrize99() {
    // Get the segment indicated by the pointer on the wheel background which is at 0 degrees.
    var winningSegment = movieWheel.getIndicatedSegment();
    console.log(winningSegment);
    console.log(winningSegment.image.slice(0, -4));

    var myurl = "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get-!1900,2019-!0,5-!0,10-!" + winningSegment.image.slice(0, -4) + "-!movie-!Any-!Any-!gt100-!{downloadable}&t=ns&cl=all&st=adv&ob=Relevance&p=1&sa=and";
    console.log(winningSegment.text);
    console.log(myurl);
    const x = Math.floor(Math.random() *5);

    var timeout = function () {

        var settings = {
            "async": true,
            "crossDomain": true,
            url: myurl,
            "method": "GET",
            "headers": {
                "X-RapidAPI-Host": "unogs-unogs-v1.p.rapidapi.com",
                "X-RapidAPI-Key": "469b7a86bamshfb892b6008ab1cdp1d07dfjsna9688aff90cf",
                "Accept": "*/*",
                "Cache-Control": "no-cache",
                "Postman-Token": "1d1ae82f-4850-48a8-bc99-51f7b6499a6c,92f4e78a-c008-4315-ad7b-a88517ab24ea",
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response.ITEMS[x].title);
            alert(response.ITEMS[x].title);

            var tRow = $("<tr>");

            // Methods run on jQuery selectors return the selector they we run on
            // This is why we can create and save a reference to a td in the same statement we update its text
            var titleTd = $("<td>").text(response.ITEMS[x].title);

            // Append the newly created table data to the table row
            tRow.append(titleTd);
            // Append the table row to the table body
            $(".movie").append(tRow);

        });
    };
    setTimeout(timeout, 500);
}
