var Terminal = /** @class */ (function () {
    function Terminal(options) {
        this.standardCommands = [];
        this.noExits = [
            32,
            { min: 65, max: 90 },
            { min: 48, max: 57 }
        ];
        this.writer = document.getElementById("writer");
        this.previousCommands = document.getElementById("previousCommands");
        this.command = '';
        this.prepareWriter();
        this.padWriter = document.getElementById("padWriter");
        this.commandLine = document.getElementById('commandLine');
        setInterval(this.changePadWriter, 500);
        this.loadStandardCommands();
        if (options !== undefined && options.typing !== undefined)
            this.typing(options.typing);
        else
            this.typing();
    }
    Terminal.prototype.typing = function (value) {
        if (arguments.length == 0 || (arguments.length > 0 && value === true)) {
            document.addEventListener('keydown', this.specialTyping.bind(this), false);
            document.addEventListener('keydown', this.normalTyping, false);
        }
        else if (value === false) {
            document.removeEventListener('keydown', this.specialTyping.bind(this), false);
            document.removeEventListener('keydown', this.normalTyping, false);
        }
    };
    Terminal.prototype.specialTyping = function (e) {
        if (e.key == "Backspace" && this.command.length > 0) {
            this.command = this.command.substr(0, this.command.length - 1);
        }
        else if (e.key == "Delete") { }
        else if (e.key == "Enter") {
            this.write(this.command);
            this.checkStandardCommands(this.command);
            this.command = '';
        }
        /*else{
            command += e.key;
        }*/
        this.refreshWriter();
    };
    Terminal.prototype.normalTyping = function (e) {
        for (var noExit in this.noExits) {
            if ((typeof this.noExits[noExit] == 'number' && e.keyCode == this.noExits[noExit]) || (e.keyCode >= this.noExits[noExit].min && e.keyCode <= this.noExits[noExit].max)) {
                this.command += e.key;
                this.refreshWriter();
                return;
            }
        }
    };
    Terminal.prototype.prepareWriter = function () {
        if (arguments.length > 0)
            this.fixedWrite = "<span id='fixedWriter'>\n                                                    <span class='userHost'>" + (arguments[0].user || 'anon') + "@dev</span>: \n                                                    <span class='path'>" + (arguments[0].path || '~') + "</span>\n                                                    <span class='userType'>" + (arguments[0].userType || '$') + "</span>\n                                                    <span id='commandLine'></span>\n                                                    <div class='padWriter0'></div>\n                                                </span>";
        else
            this.fixedWrite = "<span id='fixedWriter'>\n                                <span class='userHost'>anon@dev</span>: \n                                <span class='path'>~</span>\n                                <span class='userType'>$</span>\n                                <span id='commandLine'></span>\n                                <div id=\"padWriter\" class='padWriter1'></div>\n                            </span>";
        this.writer.innerHTML = this.fixedWrite;
    };
    Terminal.prototype.changePadWriter = function () {
        var aux = this.padWriter.classList[0];
        this.padWriter.classList.remove(aux);
        if (aux === 'padWriter0') {
            this.padWriter.classList.add('padWriter1');
        }
        else if (aux === 'padWriter1') {
            this.padWriter.classList.add('padWriter0');
        }
    };
    Terminal.prototype.refreshWriter = function () {
        this.commandLine.innerText = this.command;
    };
    Terminal.prototype.write = function (string) {
        this.previousCommands.innerHTML += " " + string + "<br />";
    };
    Terminal.prototype.read = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.typing(false);
            var promessaCumprida = function (e) {
                for (var noExit in _this.noExits) {
                    if ((typeof _this.noExits[noExit] == 'number' && e.keyCode == _this.noExits[noExit]) || (e.keyCode >= _this.noExits[noExit].min && e.keyCode <= _this.noExits[noExit].max)) {
                        _this.command += e.key;
                        _this.refreshWriter();
                    }
                }
                if (e.key == "Enter") {
                    _this.write(_this.command);
                    var aux = _this.command;
                    _this.command = '';
                    _this.refreshWriter();
                    document.removeEventListener('keydown', promessaCumprida);
                    return resolve(aux);
                }
                else if (e.key == "Backspace") {
                    _this.command = _this.command.substr(0, _this.command.length - 1);
                    _this.refreshWriter();
                }
            };
            document.addEventListener('keydown', promessaCumprida);
        });
    };
    Terminal.prototype.loadStandardCommands = function () {
        this.standardCommands.push(/help/);
        this.standardCommands.push(/show developer/);
        this.standardCommands.push(/restart/);
    };
    Terminal.prototype.checkStandardCommands = function (string) {
        if (this.standardCommands[2].test(string))
            this.restartTerminal();
    };
    Terminal.prototype.restartTerminal = function () {
        location.reload();
    };
    return Terminal;
}());
