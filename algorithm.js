function calculate_score(school) {

    var total = 0;
//Current year - Previous year dropout students
    var res = school.SchoolInformation.Dropouts.DropoutStudentsPctCurrYear - school.SchoolInformation.Dropouts.DropoutStudentsPrevYearPct;
    if (res < 0) {
        ++total;
    }

    res = school.SchoolInformation.Attendance.AttendancePctCurrYear - school.SchoolInformation.Attendance.AttendancePctPrevYear;
    if (res > 0) {
        ++total;
    }

    res = school.SchoolInformation.StudentPopulation.NumberOfStudents / school.SchoolInformation.Staffing.Teachers;
    if (res < 15) {
        total += 2;
    } else if (res < 25) {
        ++total;
    }

    if (school.SchoolInformation.Staffing.MastersDegreeOrHigherPct > 50) {
        total += 3;
    } else if (school.SchoolInformation.Staffing.MastersDegreeOrHigherPct > 35) {
        total += 2;
    } else if (school.SchoolInformation.Staffing.MastersDegreeOrHigherPct > 20) {
        ++total;
    }

    if (school.SchoolInformation.Staffing.AvgYearsExperience > 15) {
        total += 3;
    } else if (school.SchoolInformation.Staffing.AvgYearsExperience > 10) {
        total += 2;
    } else if (school.SchoolInformation.Staffing.AvgYearsExperience > 5) {
        ++total;
    }

    return total;
}