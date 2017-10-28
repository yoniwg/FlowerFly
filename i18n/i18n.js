const fs = require('fs');


class MessageSource {

    constructor(){
        this.messages = JSON.parse(fs.readFileSync('i18n/he.json', 'utf8'));
    }

    /**
     *
     * @param {string} messageId
     * @param args
     * @return {string}
     */
    find(messageId, ...args) {
        const message = this.messages[messageId];
        if (message === undefined) return messageId + "???(" + args + ")???";
        return args.reduce((message,arg,i) => message.replace('{'+i+'}', arg), message);
    }


}

module.exports = new MessageSource();