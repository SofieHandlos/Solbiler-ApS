const LEJEASIDE = document.getElementById("lejeoplysninger");

LEJEASIDE.insertAdjacentHTML("beforeend", "<br><h3>" + sessionStorage.getItem('bil') + "</h3>");
LEJEASIDE.insertAdjacentHTML("beforeend", `Afhentningsdato: ${sessionStorage.getItem('afhentningsdato')}`);
LEJEASIDE.insertAdjacentHTML("beforeend", `<br>Afleveringsdato: ${sessionStorage.getItem('afleveringsdato')}`);
LEJEASIDE.insertAdjacentHTML("beforeend", `<br>Antal dage:${sessionStorage.getItem('lejedage')}`);
LEJEASIDE.insertAdjacentHTML("beforeend", `<br><br><h4>Billeje i alt DKK ${sessionStorage.getItem('lejeudgift')}</h4>inkl. moms`);
LEJEASIDE.insertAdjacentHTML("beforeend", `<br><br><h3>Udstyrsvalg</h3><ul id="ekstraudstyr">`);
const DATA = sessionStorage.getItem("udstyrsliste");
const UDSTYRSLISTE = JSON.parse(DATA);
const EKSTRAUDSTYR = document.getElementById("ekstraudstyr");

// udskrivning af liste til skærm
for (const UDSTYR of UDSTYRSLISTE) {
    EKSTRAUDSTYR.insertAdjacentHTML("beforeend", `<li style="margin-left: 15px;">${UDSTYR}</li>`);
}

LEJEASIDE.insertAdjacentHTML("beforeend", `</ul><br><h4>Udstyr i alt DKK ${sessionStorage.getItem('udstyrsudgift')}</h4>inkl. moms`);

const TOTALASIDE = document.getElementById("totalindhold");
TOTALASIDE.insertAdjacentHTML("beforeend", `<br><h3>TOTAL DKK ${sessionStorage.getItem('total')}</h3>inkl. moms`);

const STAMOPLYSNINGER = document.getElementById("stamopl");

STAMOPLYSNINGER.insertAdjacentHTML("afterbegin", `
    <h3>Fornavn: ${sessionStorage.getItem("fornavn")}</h3>
    <h3>Efternavn: ${sessionStorage.getItem("efternavn")}</h3>
    <h3>Adresse: ${sessionStorage.getItem("vejnavn")}&nbsp;${sessionStorage.getItem("vejnr")}</h3>
    <h3>Postnr. og by: ${sessionStorage.getItem("postnr")}</h3>
`);

const UDSKRIVKNAP = document.getElementById("udskrivKnap");
UDSKRIVKNAP.addEventListener("click", function() {
    window.print();
})