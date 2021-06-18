function dateParse(dateDiff) {
    let timeString;
    if (dateDiff < 60){
        timeString = parseInt(dateDiff) + "초";
    }
    else if (dateDiff / 60 < 60) {
        timeString = parseInt(dateDiff / 60) + "분";
    }
    else if (dateDiff / 60 / 60 < 24) {
        timeString = parseInt(dateDiff / 60 / 60) + "시간";
    }
    else if (dateDiff / 60 / 60 / 24 < 30) {
        timeString = parseInt(dateDiff / 60 / 60 / 24) + "일";
    }
    else if (dateDiff / 60 / 60 / 24 / 30 < 12) {
        timeString = parsetInt(dateDiff / 60 / 60 / 24 / 30) + "달";
    }
    else {
        timeString = parseInt(dateDiff / 60 / 60 / 24 / 30 / 12) + "년";
    }
    return timeString;
}