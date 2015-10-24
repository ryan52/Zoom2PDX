var DropoutStudentsPctCurrYear = 120, DropoutStudentsPrevYearPct = 100;
var Attendancepctcurrent = 120, Attendancepctprevyear = 100;
var Numberofstudents = 120, Teachers = 100;
var Masterdegreeorhigherpct = 120;
var Avgyearexperience = 120;

(function () {

    var total = 0;

    var res = DropoutStudentsPctCurrYear - DropoutStudentsPrevYearPct;
    if (res > 0) {
        ++total;
    }

    res = Attendancepctcurrent - Attendancepctprevyear;
    if (res > 0) {
        ++total;
    }

    res = Numberofstudents / Teachers;
    if (res < 15) {
        total += 2;
    } else if (res < 25) {
        ++total;
    }

    if (Masterdegreeorhigherpct > 50) {
        total += 3;
    } else if (Masterdegreeorhigherpct > 35) {
        total += 2;
    } else if (Masterdegreeorhigherpct > 20) {
        ++total;
    }

    if (Avgyearexperience > 15) {
        total += 3;
    } else if (Avgyearexperience > 10) {
        total += 2;
    } else if (Avgyearexperience > 5) {
        ++total;
    }

    console.log(total);
})();