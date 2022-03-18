
//MOABs fetch("https://api.jsonbin.io/b/6137477a85791e1732a15029") // Husk at URL skal passe med json data 

//KIJEs fetch("https://api.jsonbin.io/b/61f8300d518e5f3b2ab39a7a") // Husk at URL skal passe med json data 




let biler = []; // Global variabel, kendt af alle

fetch("https://api.jsonbin.io/b/61f8300d518e5f3b2ab39a7a/3") //  Husk at køre live server.
    .then(function (data) { //støbt i cement forspørgslen behandles
        return data.json(); //støbt i cement
    })                      //støbt i cement
    .then(function (post) {
        biler = post.billiste; // Global variabel (array med obejkter) sættes til JSON indhold
    })

const sektion = document.getElementById('bil_sektion');
const skabelon = document.getElementById('skabelon_output');
const personer = document.getElementById('personer');
const kufferter = document.getElementById('kufferter');
const formular = document.getElementById('formular');
const afhentningsdato = document.getElementById('afhentning');
const afleveringsdato = document.getElementById('aflevering');

formular.addEventListener("submit", function (event) {
    event.preventDefault();
    if (valideDatoer(afhentningsdato.value, afleveringsdato.value)) {
        sektion.innerHTML = ""; //Nulstiller output-sektion
        for (const bil of biler) {
            if (kufferter.value <= bil.kufferter && personer.value <= bil.personer) {
                const antaldage = beregnAntalLejedage(afhentningsdato.value, afleveringsdato.value);
                const klon = skabelon.content.cloneNode(true);
                const bilMM = klon.querySelector(".bilMM");
                const billedtag = klon.querySelector("img");
                const kategori = klon.querySelector(".kategori");
                const antalpersoner = klon.querySelector(".antalpersoner");
                const antalkufferter = klon.querySelector(".antalkufferter");
                const lejeudgift = klon.querySelector(".lejeudgift");
                const lejeudgiftEuro = klon.querySelector(".lejeudgiftEuro");
                const antallejedage = klon.querySelector(".antaldageialt");

                try 
                {
                const link = klon.querySelector("a");
                link.href = `udstyr.html?bil=${bil.bilmaerke}&afhentning=${afhentningsdato.value}&aflevering=${afleveringsdato.value}&lejedage=${antaldage}&lejeudgift=${beregnLejeudgift(antaldage, bil.tillaeg)}`;
                }
                catch(e)
                {
                    alert(e.message)
                }


                billedtag.src = bil.billede;
                billedtag.alt = bil.billedtekst;
                bilMM.textContent = bil.bilmaerke;
                kategori.textContent += bil.kategori;
                antalkufferter.textContent += bil.kufferter;
                antalpersoner.textContent += bil.personer;
                antallejedage.textContent += antaldage;
                lejeudgift.textContent += beregnLejeudgift(antaldage, bil.tillaeg);
                lejeudgiftEuro.textContent += beregnLejeudgiftEUR(antaldage, bil.tillaeg);
                         
                sektion.appendChild(klon);
            }
        }
        alert("Du har valgt antal dage: " + beregnAntalLejedage(afhentningsdato.value, afleveringsdato.value));
    } else {
        sektion.innerText = "Opgiv en afleveringsdato som ligger efter afhentingsdato.";
    }
})

function valideDatoer(afhentningsdato, afleveringsdato) {
    const afhentning = new Date(afhentningsdato);
    const aflevering = new Date(afleveringsdato);
    if (afhentning > aflevering) {
        return false;
    } else {
        return true;
    }
};

function beregnAntalLejedage(afhentningsdato, afleveringsdato) {
    const AFHENTNING = new Date(afhentningsdato);
    const AFLEVERING = new Date(afleveringsdato);
    const FORSKELITID = AFLEVERING.getTime() - AFHENTNING.getTime();
    const FORSKELIDAGE = FORSKELITID / (1000 * 3600 * 24) + 1;
    return FORSKELIDAGE;
}

function beregnLejeudgift(antaldage, biltillaeg) {
    const MOMS = 0.25;
    const GRUNDBELOEB = 495;
    const PRISPRDAG = 100;
    const LEJEUDGIFT = (GRUNDBELOEB + (antaldage * PRISPRDAG) + (antaldage * biltillaeg)) * (1 + MOMS);
    return LEJEUDGIFT.toFixed(2);
}

/////////////////////////////EXTRA//////////////////////
function beregnLejeudgiftEUR(antaldage, biltillaeg) {
    const MOMS = 0.25;
    const GRUNDBELOEB = 495;
    const PRISPRDAG = 100;
    const LEJEUDGIFT = (GRUNDBELOEB + (antaldage * PRISPRDAG) + (antaldage * biltillaeg)) * (1 + MOMS);
    const iEUR = LEJEUDGIFT/7.45;
    return iEUR.toFixed(2);
}

function saetDagsDato()
{  //funktionen sætter dags dato
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();
    if(dd<10) {dd='0'+dd;} 
    if(mm<10) {mm='0'+mm;} 
    today = yyyy+'-'+mm+'-'+dd;
    return today;
}
// dags dato OG MINIMUM VALUE sættes i begge på load via funktionen myLoad() 
window.addEventListener("load", myLoad);

function myLoad(){
    document.getElementById('afhentning').value = saetDagsDato();
    document.getElementById('afhentning').setAttribute("min", document.getElementById('afhentning').value);
    document.getElementById('aflevering').value = document.getElementById('afhentning').value;
    document.getElementById('aflevering').setAttribute("min", document.getElementById('aflevering').value);
}
// dags dato sættes i begge på reset
document.getElementById('resetknap').addEventListener("click", function (event){
    event.preventDefault();
    alert("Alt nulstilles!!");
    myLoad(); // funktionen genbruges
    sektion.innerHTML = "";
});
//når datoen for afhentning ændres sættes afleveringsdato (min).
afhentningsdato.addEventListener("change", function (){
    document.getElementById('aflevering').setAttribute("min", document.getElementById('afhentning').value);
    document.getElementById('aflevering').value = document.getElementById('afhentning').value;
});
//når personer ændres tjekkes om det er imellem 1 og 7
personer.addEventListener("change", function () {
    if (personer.value <1 || personer.value > 7)
    {
        alert("Antal personer skal være imellem 1 og 7 - brug pil op og ned");
        document.getElementById('personer').focus();
        document.getElementById('personer').value = 1;
    }    
});