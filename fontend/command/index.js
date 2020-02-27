const args = process.argv.slice(2);
var addNewPage = require("./newpage.js");
if (args[0] && /\-{1,}add[pP]{1}age/.test(args[0])) {
    if (args[1] && /^[a-zA-z]{1,}$/.test(args[1])) {
        addNewPage(args[1])
        console.log("add new page:", args[1]);
    }
}