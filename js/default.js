window.onload = function(){
    initializeTerminal({
        typing: false
    });

    principal();
}

function principal(){
    write("Qual seu nome?")
    let resposta = read();
    resposta.then(res => {
        let amor = /mariana/i, yes = /y/i, no = /n/i;
        if(amor.test(res)){
            write("<br>Você tem uma nova mensagem. Gostaria de ler? < Y / n >");
            let resposta2 = read();
            resposta2.then(res2 => {
                let texto = "";
                if(yes.test(res2)){
                    texto = `<br>De: Seu velhinho<br>
                    Para: A garota mais incrível que eu conheci.<br>
                    <br>
                    Oi, amor. Sei que eu vacilo às vezes, mas quero que saiba que nada é por mal.<br>
                    Eu jamais iria querer magoar a pessoa que mais acredita em mim, que mais confia, que me dá força, que está sempre do meu lado independente do que está vindo no meu caminho.<br>
                    Sabe, amor... Eu admiro muito isso em você. Você tem mesmo o dom de me amar.<br>
                    Eu não consigo me ver com tanta felicidade tendo outra pessoa ao meu lado. Você é meu auge de felicidade, de paz, de força. Amor, você é mesmo tudo pra mim!<br>
                    Eu estou um pouco desligado do mundo, amor. Eu sei disso e agradeço sua paciência, sua vontade de não desistir e insistir. Assim como você, eu também não irei desistir de nós, não irei desistir de ti. <br>
                    Minha vida é junto à tua, saiba disso.<br>
                    Ao infinito e além.<br>
                    <br>
                    PS.: isso é só um protótipo. Vou criar algo melhor ainda, só aguarda. Amo você!`;
                }else if(no.test(res2)){
                    texto = 'Saindo...'
                }else{
                    texto = `Comando irreconhecido! Saindo...`;
                }
                write(texto);
                write('<br>Digite <b>restart</b> caso queira reiniciar este terminal.');
                typing();
            })
        }else{
            write('<br>Digite <b>restart</b> caso queira reiniciar este terminal.');
            typing();
        }
    });
}