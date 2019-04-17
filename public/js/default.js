var t;
window.onload = function(){
    t = new Terminal({
        typing: false
    });

    principal();
}

function principal(){
    t.write("Qual seu nome?")
    let resposta = t.read();
    resposta.then(res => {
        t.write(`O nome digitado foi: ${res}`);
    });
}