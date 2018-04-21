(function (window, document) {

    function splitByThousands(value) {
        var splitValue = value.toString().split('.'),
            beforeDot = splitValue[0] || '0',
            afterDot = splitValue[1] || '0',
            resplited = '',
            count = 0;
        for (var i = beforeDot.length - 1; i >= 0; i--) {
            resplited += beforeDot[i];
            count++;
            if (count === 3) {
                count = 0;
                resplited += ' ';
            }
        }
        return resplited.split('').reverse().join('') + (afterDot !== '0' ? '.' + afterDot : '');
    }

    function manualCalculate() {
        if (!manualValueNode.value) {
            return alert('ERROR! Enter value first!');
        }
        var value = parseFloat(manualValueNode.value);
        if (!isNaN(value)) {
            manualResultsNode.innerHTML += '<li><b>' + splitByThousands(value) + '</b>&ensp;&ensp;&ensp; = &ensp;&ensp;&ensp;'
                + window.afterDot.format(value) + '</li>'
        } else {
            alert('ERROR! "' + manualValueNode.value + '" is not a number!');
        }
    }

    var manualValueNode = document.getElementById('manual-value'),
        manualCalculateNode = document.getElementById('manual-calculate'),
        manualResultsNode = document.getElementById('manual-results'),
        autoResultsNode = document.getElementById('auto-results'),
        autoTests = [
            1,
            3,
            11,
            16,
            20,
            31,
            52,
            100,
            161.1,
            189.14,
            237.22,
            502.03,
            709.001,
            999.018,
            1006.333,
            2009.1111,
            4336.12348,
            10485.080808,
            546312.7003236,
            4546687,
            23708324,
            623010436,
            1000002547,
            23283293729,
            345600123458,
            4890576479845,
            9999999999999.99
        ];

    manualCalculateNode.addEventListener('click', manualCalculate);
    manualValueNode.addEventListener('keyup', function (e) {
        if (e.keyCode === 13) {
            manualCalculate();
        }
    });

    for (var i = 0; i < autoTests.length; i++) {
        autoResultsNode.innerHTML += '<li><b>' + splitByThousands(autoTests[i]) + '</b>&ensp;&ensp;&ensp; = &ensp;&ensp;&ensp;'
            + window.afterDot.format(autoTests[i]) + '</li>'
    }
})(window, document);