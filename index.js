var login = require("facebook-chat-api");
var configs = require("./configs.js");
AIMLInterpreter = require('aimlinterpreter/AIMLInterpreter');


var aimlInterpreter = new AIMLInterpreter({name: 'Rosa', age: '1'});
aimlInterpreter.loadAIMLFilesIntoArray(['./aiml/rosa.xml', './aiml/private.xml']);

function changeAlias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ  |ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ  |ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

var answeredThreads = {};

login({email: configs.USERNAME, password: configs.PASSWORD}, function callback(err, api) {
    if (err) return console.error(err);

    api.listen(function callback(err, message) {
        console.log(message);
        var msg = changeAlias(message.body);
        if (!answeredThreads.hasOwnProperty(message.threadID)) {
            answeredThreads[message.threadID] = true;
            api.sendMessage("BOT: Hello! mình là Virtual Assistant của Nguyễn Bá Cường, mình sẽ trả bạn lúc này.", message.threadID);
        }
        aimlInterpreter.findAnswerInLoadedAIMLFiles(msg, function (answer, wildCardArray, input) {
            api.sendMessage(answer, message.threadID);
        });
    });
});
