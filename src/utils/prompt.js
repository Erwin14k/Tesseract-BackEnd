const Figlet = require("figlet");

/**
 * Special ANSI escape characters used to
 * show colors in the console.
 */
const CONSOLE_COLORS = {
    reset: "\u001b[0m",
    yellow: "\u001b[33m",
    red:"\u001b[31m",
    green: "\u001b[32m",
};

function generateCharacterChain({ character, length }) {
    const charsSequence = String(character).repeat(length);
    return charsSequence;
}

exports.displayDBInitializedMessage = () => {
    const messageSeparator = generateCharacterChain({
    character: "*",
    length: 75,
    });
    console.log(
        `${messageSeparator}\n\t\t\t  DB Inititalized\n${messageSeparator}`
    );
};

exports.displayServerRunningMessage = (port) => {
    Figlet("Server Running", (error, message) => {
    if (error) console.log(`Server running on port:${port}`);

    const bannerSeparator = generateCharacterChain({
        character: "#",
        length: 75,
    });
    const padding = generateCharacterChain({ character: " ", length: 15 });

    console.clear();

    console.log(`${bannerSeparator}\n`);
    console.log(`${CONSOLE_COLORS.yellow}${message}${CONSOLE_COLORS.reset}\n`);
    console.log(`${bannerSeparator}\n`);
    console.log(`${padding}     ${CONSOLE_COLORS.green}The server is running on port: ${port}${CONSOLE_COLORS.reset}\n`);
    console.log(`${padding}${CONSOLE_COLORS.green}With great power comes great responsibility${CONSOLE_COLORS.reset}\n`);
    Figlet('             Erwin14k', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(`${CONSOLE_COLORS.red}${data}${CONSOLE_COLORS.reset}\n`);
    });
    //console.clear();
    console.log(`${bannerSeparator}`);
    });
};