const logger = require("./logger");
module.exports = function sleep(time) {
    const d1 = new Date();
    for (;;) {
        const d2 = new Date();
        if (d2 - d1 > time) {
            return;
        }
    }
};
