class Terminal {
    public writer: any;
    public fixedWrite: any;
    public padWriter: any;
    public command: any;
    public commandLine: any;
    public previousCommands: any;
    public standardCommands: any = [];
    public noExits: Array<any> = [
        32,
        { min: 65, max: 90 },
        { min: 48, max: 57 }
    ];



    public constructor(options: {typing?: boolean}){
        this.writer = document.getElementById("writer");
        this.previousCommands = document.getElementById("previousCommands");
        this.command = '';
        this.prepareWriter();
        this.padWriter = document.getElementById("padWriter");
        this.commandLine = document.getElementById('commandLine');
        setInterval(this.changePadWriter, 500);
        this.loadStandardCommands();
        if(options !== undefined && options.typing !== undefined) this.typing(options.typing);
        else this.typing();
    }

    public typing(value?: boolean): void{
        if(arguments.length == 0 || (arguments.length > 0 && value === true)){
            document.addEventListener('keydown', this.specialTyping.bind(this), false);
            document.addEventListener('keydown', this.normalTyping.bind(this), false);
        }
        else if(value === false) {
            document.removeEventListener('keydown', this.specialTyping.bind(this), false);
            document.removeEventListener('keydown', this.normalTyping.bind(this), false);
        }
    }

    private specialTyping(e): void{
        if(e.key == "Backspace" && this.command.length > 0){
            this.command = this.command.substr(0, this.command.length - 1);
        }
        else if(e.key == "Delete"){}
        else if(e.key == "Enter"){
            this.write(this.command);
            this.checkStandardCommands(this.command);
            this.command = '';
        }
        /*else{
            command += e.key;
        }*/

        this.refreshWriter();
    }


    private normalTyping(e): void{
        for(let noExit in this.noExits){
            if((typeof this.noExits[noExit] == 'number' && e.keyCode == this.noExits[noExit]) || (e.keyCode >= this.noExits[noExit].min && e.keyCode <= this.noExits[noExit].max)){
                this.command += e.key;
                this.refreshWriter();
                return
            }
        }
    }

    private prepareWriter(): void{
        if(arguments.length > 0) this.fixedWrite =  `<span id='fixedWriter'>
                                                    <span class='userHost'>${arguments[0].user || 'anon'}@dev</span>: 
                                                    <span class='path'>${arguments[0].path || '~'}</span>
                                                    <span class='userType'>${arguments[0].userType || '$'}</span>
                                                    <span id='commandLine'></span>
                                                    <div class='padWriter0'></div>
                                                </span>`;
        else this.fixedWrite =  `<span id='fixedWriter'>
                                <span class='userHost'>anon@dev</span>: 
                                <span class='path'>~</span>
                                <span class='userType'>$</span>
                                <span id='commandLine'></span>
                                <div id="padWriter" class='padWriter1'></div>
                            </span>`;

        this.writer.innerHTML = this.fixedWrite;
    }

    private changePadWriter(): void{
        let aux = this.padWriter.classList[0];
        this.padWriter.classList.remove(aux)
        if(aux === 'padWriter0'){
            this.padWriter.classList.add('padWriter1');
        }else if(aux === 'padWriter1'){
            this.padWriter.classList.add('padWriter0');
        }
    }

    private refreshWriter(): void{
        this.commandLine.innerText = this.command;
    }

    private write(string): void{
        this.previousCommands.innerHTML += ` ${string}<br />`;
    }

    private read(): Promise<string>{
        return new Promise((resolve, reject) => {
            this.typing(false);

            let promessaCumprida: any = (e: any) => {
                for(let noExit in this.noExits){
                    if((typeof this.noExits[noExit] == 'number' && e.keyCode == this.noExits[noExit]) || (e.keyCode >= this.noExits[noExit].min && e.keyCode <= this.noExits[noExit].max)){
                        this.command += e.key;
                        this.refreshWriter();
                    }
                }
                if(e.key == "Enter"){
                    this.write(this.command);
                    let aux = this.command;
                    this.command = '';
                    this.refreshWriter();
                    document.removeEventListener('keydown', promessaCumprida);
                    return resolve(aux);
                }else if(e.key == "Backspace"){
                    this.command = this.command.substr(0, this.command.length - 1);
                    this.refreshWriter();
                }       
            }
            document.addEventListener('keydown', promessaCumprida);
        });
    }

    private loadStandardCommands(): void{
        this.standardCommands.push(/help/);
        this.standardCommands.push(/show developer/);
        this.standardCommands.push(/restart/);
    }

    private checkStandardCommands(string: string): void{
        if(this.standardCommands[2].test(string)) this.restartTerminal();
    }

    private restartTerminal(): void{
        location.reload();
    }
}