var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Terminal = /** @class */ (function () {
    function Terminal(options) {
        this.standardCommands = [];
        this.noExits = [
            32,
            { min: 65, max: 90 },
            { min: 48, max: 57 }
        ];
        this.users = [
            { login: 'luiz', password: 'terminaldoluiz', permission: 0 }
        ];
        this.terminalContainer = document.getElementById("terminalContainer");
        this.writer = document.createElement('span');
        this.previousCommands = document.createElement('div');
        this.writer.setAttribute("id", "writer");
        this.previousCommands.setAttribute("id", "previousCommands");
        this.terminalContainer.appendChild(this.previousCommands);
        this.terminalContainer.appendChild(this.writer);
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
        console.log(this.logar());
    }
    Terminal.prototype.typing = function (value) {
        if (arguments.length == 0 || (arguments.length > 0 && value === true)) {
            document.addEventListener('keydown', this.specialTyping.bind(this), false);
            document.addEventListener('keydown', this.normalTyping.bind(this), false);
        }
        else if (value === false) {
            document.removeEventListener('keydown', this.specialTyping.bind(this), false);
            document.removeEventListener('keydown', this.normalTyping.bind(this), false);
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
    Terminal.prototype.prepareWriter = function (options) {
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
                    _this.typing();
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
    Terminal.prototype.readPassword = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.typing(false);
            var promessaCumprida = function (e) {
                for (var noExit in _this.noExits) {
                    if ((typeof _this.noExits[noExit] == 'number' && e.keyCode == _this.noExits[noExit]) || (e.keyCode >= _this.noExits[noExit].min && e.keyCode <= _this.noExits[noExit].max)) {
                        _this.command += e.key;
                        //this.refreshWriter();
                    }
                }
                if (e.key == "Enter") {
                    _this.write(_this.command);
                    var aux = _this.command;
                    _this.command = '';
                    _this.refreshWriter();
                    document.removeEventListener('keydown', promessaCumprida);
                    _this.typing();
                    return resolve(aux);
                }
                else if (e.key == "Backspace") {
                    _this.command = _this.command.substr(0, _this.command.length - 1);
                    //this.refreshWriter();
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
    Terminal.prototype.verifyLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.write('Digite seu login:');
            var loginStart = _this.read();
            loginStart.then(function (login) {
                var profiles = [];
                _this.users.forEach(function (element) {
                    if (login === element.login) {
                        profiles.push(element);
                    }
                });
                resolve(profiles);
                /*if(auth){
                    this.write('Digite sua senha:');
                    let password = this.readPassword();
                    password.then(pass => {
                        let authP: boolean = false;
                        for(let i in this.users){
                            if(pass === this.users[i].password){
                                authP = true;
                                if(authP) return resolve(this.users[i]);
                            }
                        }
                        throw new Error("Senha inválida. Digite <i>restart</i> para reiniciar o terminal");
                    });
                }else reject(new Error("Usuário inválido. Digite <i>restart</i> para reiniciar o terminal"));*/
            });
        });
    };
    Terminal.prototype.verifyPassword = function (users) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.write('Digite sua senha:');
            var password = _this.readPassword();
            password.then(function (pass) {
                users.forEach(function (element) {
                    if (pass === element.password) {
                        resolve(element);
                    }
                });
            });
        });
    };
    Terminal.prototype.logar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loginSuccessfully, passwordSuccessfully;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.verifyLogin()];
                    case 1:
                        loginSuccessfully = _a.sent();
                        if (!(loginSuccessfully.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.verifyPassword(loginSuccessfully)];
                    case 2:
                        passwordSuccessfully = _a.sent();
                        return [2 /*return*/, passwordSuccessfully];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    return Terminal;
}());
