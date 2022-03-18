const URL = window.location.search;
const URLDATA = new URLSearchParams(URL);
const LEJEASIDE = document.getElementById("lejeoplysninger");

LEJEASIDE.insertAdjacentHTML("beforeend", "<br><h3>" + URLDATA.get('bil') + "</h3>");
LEJEASIDE.insertAdjacentHTML("beforeend", `<br>Afhentningsdato: ${URLDATA.get('afhentning')}`);
LEJEASIDE.insertAdjacentHTML("beforeend", `<br>Afleveringsdato: ${URLDATA.get('aflevering')}`);
LEJEASIDE.insertAdjacentHTML("beforeend", `<br>Antal dage: ${URLDATA.get('lejedage')}`);
LEJEASIDE.insertAdjacentHTML("beforeend", `<br><br><h3>Billeje i alt ${parseFloat(URLDATA.get('lejeudgift')).toLocaleString('da-DK', { style: 'currency', currency: 'DKK' })}</h3>inkl. moms`);

sessionStorage.setItem("bil", URLDATA.get('bil'));
sessionStorage.setItem("afhentningsdato", URLDATA.get('afhentning'));
sessionStorage.setItem("afleveringsdato", URLDATA.get('aflevering'));
sessionStorage.setItem("lejedage", URLDATA.get('lejedage'));
sessionStorage.setItem("lejeudgift", parseFloat(URLDATA.get('lejeudgift')).toLocaleString('da-DK', { style: 'currency', currency: 'DKK' }));

let TOTAL = parseFloat(URLDATA.get('lejeudgift'));
let UDSTYRSUDGIFT = 0.00;

const TOTALASIDE = document.getElementById("totalindhold");
visTotal();

const CHECKBOKSE = document.getElementsByClassName("checkboks");

for (const CHECKBOKS of CHECKBOKSE) {
    CHECKBOKS.addEventListener("change", function () {
        if (this.checked === true) { // Hvis der vælges en vare
            TOTAL = Math.abs(TOTAL + parseFloat(this.value)); // læg udstyrspris til total
            UDSTYRSUDGIFT = Math.abs(UDSTYRSUDGIFT + parseFloat(this.value));
        }
        else { // Hvis der fravælges en vare
            TOTAL = Math.abs(TOTAL - parseFloat(this.value)); // træk udstyrspris fra total
            UDSTYRSUDGIFT = Math.abs(UDSTYRSUDGIFT - parseFloat(this.value));
        }
        visTotal();
    })
}

const FORMULAR = document.getElementById("formular");
FORMULAR.addEventListener("submit", gemValgtUdstyr); 

function gemValgtUdstyr() {
    let udstyrsliste = [];
    for (const CHECKBOKS of CHECKBOKSE) {
        if (CHECKBOKS.checked === true) {
            udstyrsliste.push(CHECKBOKS.dataset.udstyr);     
        }
    }
    sessionStorage.setItem("udstyrsliste", JSON.stringify(udstyrsliste));
    sessionStorage.setItem("udstyrsudgift", UDSTYRSUDGIFT.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' }));
    sessionStorage.setItem("total", TOTAL.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' }));
}

function visTotal() {
    TOTALASIDE.innerHTML = `<br><h3>TOTAL ${TOTAL.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' })}</h3>inkl. moms`;
}


