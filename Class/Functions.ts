
export function displayWords(words) {
    let str = "";
    for (let i = 0; i < words.length; i++) {
        if (i == 0) {
            str += '"' + words[i] + '"';
        } else if (i < words.length - 1) {
            str += ", " + '"' + words[i] + '"';
        } else {
            str += " and " + '"' + words[i] + '"';
        }
    }
    if (str == "") {
        str = "nothing";
    }
    return str;
}

export function params(commandLine) {
    let doubleDoubleQuote = '<DDQ>';
    while (commandLine.indexOf(doubleDoubleQuote) > -1) doubleDoubleQuote += '@';
    let noDoubleDoubleQuotes = commandLine.replace(/""/g, doubleDoubleQuote);
    let spaceMarker = '<SP>';
    while (commandLine.indexOf(spaceMarker) > -1) spaceMarker += '@';
    let noSpacesInQuotes = noDoubleDoubleQuotes.replace(/"([^"]*)"?/g, (fullMatch, capture) => {
        return capture.replace(/ /g, spaceMarker)
            .replace(RegExp(doubleDoubleQuote, 'g'), '"');
    });
    let mangledParamArray = noSpacesInQuotes.split(/ +/);
    return mangledParamArray.map((mangledParam) => {
        return mangledParam.replace(RegExp(spaceMarker, 'g'), ' ')
            .replace(RegExp(doubleDoubleQuote, 'g'), '');
    });

}