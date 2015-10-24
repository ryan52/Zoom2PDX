function calculate_score(school) {

    var total = 0;
//+1 if less dropouts CURRENT year from the previous.
    var res = school.SchoolInformation.Dropouts.DropoutStudentsPctCurrYear - school.SchoolInformation.Dropouts.DropoutStudentsPrevYearPct;
    if (res < 0) {
        ++total;
    }
//+1 If MORE ATTENDANCE in CURRENT year from the PREVIOUS.
    res = school.SchoolInformation.Attendance.AttendancePctCurrYear - school.SchoolInformation.Attendance.AttendancePctPrevYear;
    if (res > 0) {
        ++total;
    }
//+2 If STUDENTS/TEACHER ratio is less than 15/1
//+1 If STUDENTS/TEACHER ratio is less than 25/1
    res = school.SchoolInformation.StudentPopulation.NumberOfStudents / school.SchoolInformation.Staffing.Teachers;
    if (res < 15) {
        total += 2;
    } else if (res < 25) {
        ++total;
    }
//+3 if more than 50% of staff with MASTERSDEGREE OR HIGHER 
//+2 if more than 35% of staff with MASTERSDEGREE OR HIGHER
//+1 if more than 20% of staff with MASTERSDEGREE OR HIGHER
    if (school.SchoolInformation.Staffing.MastersDegreeOrHigherPct > 50) {
        total += 3;
    } else if (school.SchoolInformation.Staffing.MastersDegreeOrHigherPct > 35) {
        total += 2;
    } else if (school.SchoolInformation.Staffing.MastersDegreeOrHigherPct > 20) {
        ++total;
    }
//+3 if STAFF has more than 15 YEARS EXPERIENCE OR HIGHER 
//+2 if STAFF has more than 10 YEARS EXPERIENCE OR HIGHER 
//+1 if STAFF has more than 5 YEARS EXPERIENCE OR HIGHER 
    if (school.SchoolInformation.Staffing.AvgYearsExperience > 15) {
        total += 3;
    } else if (school.SchoolInformation.Staffing.AvgYearsExperience > 10) {
        total += 2;
    } else if (school.SchoolInformation.Staffing.AvgYearsExperience > 5) {
        ++total;
    }

    return total;
}