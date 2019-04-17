var writer,
    fixedWrite,
    padWriter,
    command,
    commandLine,
    previousCommands,
    standardCommands = [],
    noExits = [
        32,
        { min: 65, max: 90 },
        { min: 48, max: 57 }
    ];



function initializeTerminal(options){
    writer = document.getElementById("writer");
    previousCommands = document.getElementById("previousCommands");
    command = '';
    prepareWriter();
    padWriter = document.getElementById("padWriter");
    commandLine = document.getElementById('commandLine');
    setInterval(changePadWriter, 500);
    loadStandardCommands();
    if(options !== undefined && options.typing !== undefined) typing(options.typing);
    else typing();
}

function typing(value){
    if(arguments.length == 0 || (arguments.length > 0 && value === true)){
        document.addEventListener('keydown', specialTyping, false);
        document.addEventListener('keydown', normalTyping, false);
    }
    else if(value === false) {
        document.removeEventListener('keydown', specialTyping, false);
        document.removeEventListener('keydown', normalTyping, false);
    }
}

function specialTyping(e){
    if(e.key == "Backspace" && command.length > 0){
        command = command.substr(0, command.length - 1);
    }
    else if(e.key == "Delete"){}
    else if(e.key == "Enter"){
        write(command);
        checkStandardCommands(command);
        command = '';
    }
    /*else{
        command += e.key;
    }*/

    refreshWriter();
}


function normalTyping(e){
    for(let noExit in noExits){
        if((typeof noExits[noExit] == 'number' && e.keyCode == noExits[noExit]) || (e.keyCode >= noExits[noExit].min && e.keyCode <= noExits[noExit].max)){
            command += e.key;
            refreshWriter();
            return
        }
    }
}

function prepareWriter(){
    if(arguments.length > 0) fixedWrite =  `<span id='fixedWriter'>
                                                <span class='userHost'>${arguments[0].user || 'anon'}@dev</span>: 
                                                <span class='path'>${arguments[0].path || '~'}</span>
                                                <span class='userType'>${arguments[0].userType || '$'}</span>
                                                <span id='commandLine'></span>
                                                <div class='padWriter0'></div>
                                            </span>`;
    else fixedWrite =  `<span id='fixedWriter'>
                            <span class='userHost'>anon@dev</span>: 
                            <span class='path'>~</span>
                            <span class='userType'>$</span>
                            <span id='commandLine'></span>
                            <div id="padWriter" class='padWriter1'></div>
                        </span>`;

    writer.innerHTML = fixedWrite;
}

function changePadWriter(){
    let aux = padWriter.classList[0];
    padWriter.classList.remove(aux)
    if(aux === 'padWriter0'){
        padWriter.classList.add('padWriter1');
    }else if(aux === 'padWriter1'){
        padWriter.classList.add('padWriter0');
    }
}

function refreshWriter(){
    commandLine.innerText = command;
}

function write(string){
    previousCommands.innerHTML += ` ${string}<br />`;
}

function read(){
    return new Promise((resolve, reject) => {
        typing({
            typing: false
        });

        function promessaCumprida(e){
            for(let noExit in noExits){
                if((typeof noExits[noExit] == 'number' && e.keyCode == noExits[noExit]) || (e.keyCode >= noExits[noExit].min && e.keyCode <= noExits[noExit].max)){
                    command += e.key;
                    refreshWriter();
                }
            }
            if(e.key == "Enter"){
                write(command);
                let aux = command;
                command = '';
                refreshWriter();
                document.removeEventListener('keydown', promessaCumprida);
                return resolve(aux);
            }else if(e.key == "Backspace"){
                command = command.substr(0, command.length - 1);
                refreshWriter();
            }       
        }
        document.addEventListener('keydown', promessaCumprida);
    });
}

function loadStandardCommands(){
    standardCommands.push(/help/);
    standardCommands.push(/show developer/);
    standardCommands.push(/restart/);
}

function checkStandardCommands(string){
    if(standardCommands[2].test(string)) restartTerminal();
}

function restartTerminal(){
    location.reload();
}