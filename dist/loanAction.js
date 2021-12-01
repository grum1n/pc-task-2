var GreitojiPaskola = /** @class */ (function () {
    function GreitojiPaskola(maxPaskolosDydis, maxTerminasMetais, palukanos) {
        this.dvylikaMenesiu = 12;
        this.simtasProcentu = 100;
        this.klaidosZinute = 'Suvesti neteisingi duomenys';
        this.maxPaskolosDydis = maxPaskolosDydis;
        this.maxTerminasMetais = maxTerminasMetais;
        this.palukanos = palukanos;
    }
    GreitojiPaskola.prototype.inicijuotiSkaiciavima = function () {
        var greitosPaskolosRezultatas;
        var intPaskolosDydis = parseInt(document.getElementById('paskolosDydis').value);
        var intTerminas = parseInt(document.getElementById('terminas').value);
        var intPalukanos = parseInt(document.getElementById('palukanos').value);
        if (intPaskolosDydis <= this.maxPaskolosDydis && intTerminas <= this.maxTerminasMetais) {
            var palukanuApibendrinimas = this.paskaiciuotiPalukanas(intPaskolosDydis, intTerminas, intPalukanos);
            greitosPaskolosRezultatas = "M\u0117nesin\u0117 \u012Fmoka b\u016Bt\u0173 ".concat(palukanuApibendrinimas, " eur\u0173. Pra\u0161omas paskolos dydis : ").concat(intPaskolosDydis, " eur\u0173,  Terminas pasirinktas : ").concat(intTerminas, " metai, Metin\u0117 pal\u016Bkan\u0173 norma : ").concat(intPalukanos, " %.");
        }
        else if (intPaskolosDydis >= this.maxPaskolosDydis && intTerminas <= this.maxTerminasMetais) {
            greitosPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiDydisDuomenys').innerHTML = this.klaidosZinute;
        }
        else if (intPaskolosDydis <= this.maxPaskolosDydis && intTerminas >= this.maxTerminasMetais) {
            greitosPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiTerminoDuomenys').innerHTML = this.klaidosZinute;
        }
        else {
            greitosPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiDydisDuomenys').innerHTML = this.klaidosZinute;
            document.getElementById('neteisingiTerminoDuomenys').innerHTML = this.klaidosZinute;
        }
        document.getElementById("GPresult").innerHTML = greitosPaskolosRezultatas;
    };
    GreitojiPaskola.prototype.paskaiciuotiPalukanas = function (intPaskolosDydis, intTerminas, intPalukanos) {
        var galutinesPalukanos = intPaskolosDydis / this.simtasProcentu * intPalukanos * intTerminas;
        var paskolosSumaSuPalukanom = intPaskolosDydis + galutinesPalukanos;
        var menesioPalukanos = parseInt((paskolosSumaSuPalukanom / intTerminas / this.dvylikaMenesiu).toFixed(2));
        return menesioPalukanos;
    };
    return GreitojiPaskola;
}());
var BustoPaskola = /** @class */ (function () {
    function BustoPaskola(maxPaskolosDydis, maxTerminasMetais, minimaliAlga, vaikai, palukanos) {
        this.klaidosZinute = 'Suvesti neteisingi duomenys';
        this.vaikai = 0;
        this.minimaliSumaVaikui = 180;
        this.zinuteAtmestaPaskola = 'Jus negalite pasiskolinti tokios sumos.';
        this.dvylikaMenesiu = 12;
        this.simtasProcentu = 100;
        this.keturiasdesimtProcentu = 40;
        this.maxPaskolosDydis = maxPaskolosDydis;
        this.maxTerminasMetais = maxTerminasMetais;
        this.vaikai = vaikai;
        this.palukanos = palukanos;
        this.minimaliAlga = minimaliAlga;
    }
    BustoPaskola.prototype.inicijuotiSkaiciavima = function () {
        var bustoPaskolosRezultatas;
        var intPaskolosDydisPagalAlga = parseInt(document.getElementById('paskolosDydisPagalAlga').value);
        var intTerminas = parseInt(document.getElementById('terminasBP').value);
        var intAlga = parseInt(document.getElementById('alga').value);
        var intVaikai = parseInt(document.getElementById('vaikai').value);
        var intPalukanos = parseInt(document.getElementById('palukanosBP').value);
        if (intPaskolosDydisPagalAlga <= this.maxPaskolosDydis && intTerminas <= this.maxTerminasMetais && intAlga >= this.minimaliAlga && intVaikai <= this.vaikai && intPalukanos) {
            var galutinisRezultatas = this.patikrintiKiekGaliPasiskolinti(intPaskolosDydisPagalAlga, this.palukanos, intTerminas, intAlga, this.minimaliSumaVaikui, intVaikai);
            bustoPaskolosRezultatas = "".concat(galutinisRezultatas, " Ats: ").concat(intPaskolosDydisPagalAlga, " eur,  ").concat(intTerminas, " metai, ").concat(intAlga, " alga, ").concat(intVaikai, " vaikai, ").concat(intPalukanos, " %, menesine \u012Fmoka palukanuApibendrinimas.");
        }
        else if (intPaskolosDydisPagalAlga >= this.maxPaskolosDydis && intTerminas <= this.maxTerminasMetais && intAlga >= this.minimaliAlga && intVaikai <= this.vaikai && intPalukanos) {
            bustoPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiDydisDuomenysBP').innerHTML = this.klaidosZinute;
        }
        else if (intPaskolosDydisPagalAlga <= this.maxPaskolosDydis && intTerminas >= this.maxTerminasMetais && intAlga >= this.minimaliAlga && intVaikai <= this.vaikai && intPalukanos) {
            bustoPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiTerminoDuomenysBP').innerHTML = this.klaidosZinute;
        }
        else if (intPaskolosDydisPagalAlga <= this.maxPaskolosDydis && intTerminas <= this.maxTerminasMetais && intAlga <= this.minimaliAlga && intVaikai <= this.vaikai && intPalukanos) {
            bustoPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiAlgosDuomenysBP').innerHTML = this.klaidosZinute;
        }
        else if (intPaskolosDydisPagalAlga <= this.maxPaskolosDydis && intTerminas <= this.maxTerminasMetais && intAlga >= this.minimaliAlga && intVaikai > this.vaikai && intPalukanos) {
            bustoPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiVaikuDuomenysBP').innerHTML = this.klaidosZinute;
        }
        else {
            bustoPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiDydisDuomenysBP').innerHTML = this.klaidosZinute;
            document.getElementById('neteisingiVaikuDuomenysBP').innerHTML = this.klaidosZinute;
            document.getElementById('neteisingiAlgosDuomenysBP').innerHTML = this.klaidosZinute;
            document.getElementById('neteisingiTerminoDuomenysBP').innerHTML = this.klaidosZinute;
        }
        document.getElementById("BPresult").innerHTML = bustoPaskolosRezultatas;
    };
    BustoPaskola.prototype.patikrintiKiekGaliPasiskolinti = function (intPaskolosDydisPagalAlga, palukanos, intTerminas, intAlga, minimaliSumaVaikui, intVaikai) {
        if (intAlga >= this.minimaliAlga && intVaikai <= this.vaikai) {
            var perskaičiuojamaAlga = intAlga - minimaliSumaVaikui * intVaikai;
            var paskaiciuotosPalukanos = intPaskolosDydisPagalAlga / this.simtasProcentu * palukanos * intTerminas;
            var grazinamaBendraPaskolosSuma = intPaskolosDydisPagalAlga + paskaiciuotosPalukanos;
            if (perskaičiuojamaAlga >= this.minimaliAlga) {
                var taikomeLBFormuleGaunameSuma = perskaičiuojamaAlga / this.simtasProcentu * this.keturiasdesimtProcentu;
                var menesioImoka = Math.round(grazinamaBendraPaskolosSuma / intTerminas / this.dvylikaMenesiu);
                var kiekMenesiuReikesMoketi = Math.round(grazinamaBendraPaskolosSuma / taikomeLBFormuleGaunameSuma);
                var paverciameMenesiusIMetus = kiekMenesiuReikesMoketi / this.dvylikaMenesiu;
                if (paverciameMenesiusIMetus <= intTerminas) {
                    return "M\u0117nesio \u012Fmoka b\u016Bt\u0173 ".concat(menesioImoka, " eur\u0173");
                }
                else {
                    return this.zinuteAtmestaPaskola;
                }
            }
            else {
                return "".concat(this.zinuteAtmestaPaskola, " Nes J\u016Bs\u0173 alga perma\u017Ea,pasirinkite kitok\u012F termin\u0105 arba sum\u0105.");
            }
        }
        else if (intAlga >= this.minimaliAlga && intVaikai > this.vaikai) {
            return this.zinuteAtmestaPaskola;
        }
        else {
            return this.zinuteAtmestaPaskola;
        }
    };
    return BustoPaskola;
}());
var VartojimoPaskola = /** @class */ (function () {
    function VartojimoPaskola(maxPaskolosDydis, maxTerminasMetais, palukanos) {
        this.simtasProcentu = 100;
        this.dvylikaMenesiu = 12;
        this.klaidosZinute = 'Suvesti neteisingi duomenys';
        this.maxPaskolosDydis = maxPaskolosDydis;
        this.maxTerminasMetais = maxTerminasMetais;
        this.palukanos = palukanos;
    }
    VartojimoPaskola.prototype.inicijuotiSkaiciavima = function () {
        var vartojimoPaskolosRezultatas;
        var intPaskolosDydis = parseInt(document.getElementById('paskolosDydisVP').value);
        var intTerminas = parseInt(document.getElementById('terminasVP').value);
        var intPalukanos = parseInt(document.getElementById('palukanosVP').value);
        if (intPaskolosDydis <= this.maxPaskolosDydis && intTerminas <= this.maxTerminasMetais) {
            var palukanuApibendrinimas = this.paskaiciuotiPalukanas(intPaskolosDydis, intTerminas, intPalukanos);
            vartojimoPaskolosRezultatas = " Ats: ".concat(intPaskolosDydis, " eur,  ").concat(intTerminas, " metai, ").concat(intPalukanos, " %, menesine \u012Fmoka ").concat(palukanuApibendrinimas, ".");
        }
        else if (intPaskolosDydis >= this.maxPaskolosDydis && intTerminas <= this.maxTerminasMetais) {
            vartojimoPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiDydisDuomenysVP').innerHTML = this.klaidosZinute;
        }
        else if (intPaskolosDydis <= this.maxPaskolosDydis && intTerminas >= this.maxTerminasMetais) {
            vartojimoPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiTerminoDuomenysVP').innerHTML = this.klaidosZinute;
        }
        else {
            vartojimoPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiDydisDuomenysVP').innerHTML = this.klaidosZinute;
            document.getElementById('neteisingiTerminoDuomenysVP').innerHTML = this.klaidosZinute;
        }
        document.getElementById("VPresult").innerHTML = vartojimoPaskolosRezultatas;
    };
    VartojimoPaskola.prototype.paskaiciuotiPalukanas = function (intPaskolosDydis, intTerminas, intPalukanos) {
        var galutinesPalukanos = intPaskolosDydis / this.simtasProcentu * intPalukanos * intTerminas;
        var paskolosSumaSuPalukanom = intPaskolosDydis + galutinesPalukanos;
        var menesioPalukanos = parseInt((paskolosSumaSuPalukanom / intTerminas / this.dvylikaMenesiu).toFixed(2));
        return menesioPalukanos;
    };
    return VartojimoPaskola;
}());
var showGPResult = function () {
    var greitojiPaskola = new GreitojiPaskola(5000, 2, 20);
    greitojiPaskola.inicijuotiSkaiciavima();
};
var showBPResult = function () {
    var bustoPaskola = new BustoPaskola(200000, 30, 650, 15, 2);
    bustoPaskola.inicijuotiSkaiciavima();
};
var showVPResult = function () {
    var vartojimoPaskola = new VartojimoPaskola(10000, 5, 10);
    vartojimoPaskola.inicijuotiSkaiciavima();
};
