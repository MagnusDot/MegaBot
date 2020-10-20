
export function displayWords(words) {
    let str = "";
    for (let i=0;i<words.length;i++) {
        if (i == 0) {
            str += words[i];
        } else if (i < words.length-1) {
            str += ", "+words[i];
        } else {
            str += " and "+words[i];
        }
    }
    if (str == "") {
        str = "nothing";
    }
    return str;
}