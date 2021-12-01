interface Paskola {
    maxPaskolosDydis: number;
    maxTerminasMetais:number;
    paskolosDydis: number;
    paskolosTerminas: number;
    palukanos: number;
    alga?: number;
    vaikai?: number;
    daiktoTipas?: String;
    klaidosZinute?: string;
    zinuteAtmestaPaskola?: string;
    simtasProcentu?:number;
    inicijuotiSkaiciavima():void;
}

class GreitojiPaskola implements Paskola{
    maxPaskolosDydis: number;
    maxTerminasMetais: number;
    paskolosDydis: number;
    paskolosTerminas: number;
    palukanos: number;
    dvylikaMenesiu:number = 12;
    simtasProcentu:number = 100;
    klaidosZinute: string = 'Suvesti neteisingi duomenys';

    constructor( maxPaskolosDydis: number, maxTerminasMetais: number, palukanos: number){
        this.maxPaskolosDydis = maxPaskolosDydis;
        this.maxTerminasMetais = maxTerminasMetais;
        this.palukanos = palukanos;
    }
    inicijuotiSkaiciavima():void {

        let greitosPaskolosRezultatas: any;
        let intPaskolosDydis: number =  parseInt((<HTMLInputElement>document.getElementById('paskolosDydis')).value);
        let intTerminas: number =  parseInt((<HTMLInputElement>document.getElementById('terminas')).value);
        let intPalukanos: number =  parseInt((<HTMLInputElement>document.getElementById('palukanos')).value);

        if(intPaskolosDydis <= this.maxPaskolosDydis && intTerminas <=  this.maxTerminasMetais) {
            let palukanuApibendrinimas = this.paskaiciuotiPalukanas(intPaskolosDydis, intTerminas,intPalukanos);
            greitosPaskolosRezultatas = `
            <p>Mėnesinė įmoka būtų ${palukanuApibendrinimas} eurų.</p> 
            <p>Prašomas paskolos dydis : ${intPaskolosDydis} eurų. </p>  
            <p>Terminas pasirinktas : ${intTerminas} metai</p>
            <p>Metinė palūkanų norma : ${intPalukanos} %.</p>`;
        } else if (intPaskolosDydis >= this.maxPaskolosDydis && intTerminas <=  this.maxTerminasMetais){
            greitosPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiDydisDuomenys').innerHTML = this.klaidosZinute;
        } else if (intPaskolosDydis <= this.maxPaskolosDydis && intTerminas >=  this.maxTerminasMetais){
            greitosPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiTerminoDuomenys').innerHTML = this.klaidosZinute;
        } else {
            greitosPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiDydisDuomenys').innerHTML = this.klaidosZinute;
            document.getElementById('neteisingiTerminoDuomenys').innerHTML = this.klaidosZinute;
        }

        document.getElementById("GPresult").innerHTML = greitosPaskolosRezultatas;
       
    }
    paskaiciuotiPalukanas( intPaskolosDydis: number,intTerminas: number, intPalukanos: number): number{
        let galutinesPalukanos = intPaskolosDydis / this.simtasProcentu * intPalukanos * intTerminas;
        let paskolosSumaSuPalukanom =  intPaskolosDydis + galutinesPalukanos;
        let menesioPalukanos =  parseInt((paskolosSumaSuPalukanom/ intTerminas / this.dvylikaMenesiu).toFixed(2));
        if(menesioPalukanos > 0){
            return menesioPalukanos;
        } else {
            return 0;
        }
        
    }  
} 

class BustoPaskola implements Paskola{
    maxPaskolosDydis: number;
    minPaskolosDydis: number;
    maxTerminasMetais: number;
    paskolosDydis: number;
    paskolosTerminas: number;
    palukanos: number;
    klaidosZinute: string = 'Suvesti neteisingi duomenys';
    alga: number;
    vaikai: number = 0;
    minimaliAlga: number;
    minimaliSumaVaikui: number = 180;
    zinuteAtmestaPaskola: string = 'Jus negalite pasiskolinti tokios sumos.';
    dvylikaMenesiu:number = 12;
    simtasProcentu:number = 100;
    keturiasdesimtProcentu: number = 40;

    constructor( maxPaskolosDydis: number, maxTerminasMetais: number, minimaliAlga: number, vaikai: number,palukanos: number){
        this.maxPaskolosDydis = maxPaskolosDydis;
        this.maxTerminasMetais = maxTerminasMetais;
        this.vaikai = vaikai;
        this.palukanos = palukanos;
        this.minimaliAlga = minimaliAlga;
    }
    inicijuotiSkaiciavima():void {

        let bustoPaskolosRezultatas: any;
        let intPaskolosDydisPagalAlga: number =  parseInt((<HTMLInputElement>document.getElementById('paskolosDydisPagalAlga')).value);
        let intTerminas: number =  parseInt((<HTMLInputElement>document.getElementById('terminasBP')).value);
        let intAlga: number =  parseInt((<HTMLInputElement>document.getElementById('alga')).value);
        let intVaikai: number =  parseInt((<HTMLInputElement>document.getElementById('vaikai')).value);
        let intPalukanos: number =  parseInt((<HTMLInputElement>document.getElementById('palukanosBP')).value);

        if (intPaskolosDydisPagalAlga <= this.maxPaskolosDydis && intTerminas <= this.maxTerminasMetais && intAlga >= this.minimaliAlga && intVaikai <= this.vaikai && intPalukanos){
            let galutinisRezultatas = this.patikrintiKiekGaliPasiskolinti(intPaskolosDydisPagalAlga, this.palukanos, intTerminas, intAlga, this.minimaliSumaVaikui, intVaikai)
            bustoPaskolosRezultatas = `
            <p>Mėnesinė įmoka būtų ${galutinisRezultatas} eurų.</p>
            <p>Prašomas paskolos dydis : ${intPaskolosDydisPagalAlga} eurų. </p>
            <p>Terminas pasirinktas : ${intTerminas} metai.</p>
            <p>Nurodyta alga : ${intAlga} eurų.</p>
            <p>Turimi vaikai : ${intVaikai} .</p>
            <p>Metinė palūkanų norma : ${intPalukanos} %.</p>
            `;
       } else if(intPaskolosDydisPagalAlga >= this.maxPaskolosDydis && intTerminas <= this.maxTerminasMetais && intAlga >= this.minimaliAlga && intVaikai <= this.vaikai && intPalukanos){
            bustoPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiDydisDuomenysBP').innerHTML = this.klaidosZinute;
        } else if(intPaskolosDydisPagalAlga <= this.maxPaskolosDydis && intTerminas >= this.maxTerminasMetais && intAlga >= this.minimaliAlga && intVaikai <= this.vaikai && intPalukanos){
            bustoPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiTerminoDuomenysBP').innerHTML = this.klaidosZinute;
        } else if(intPaskolosDydisPagalAlga <= this.maxPaskolosDydis  && intTerminas <= this.maxTerminasMetais && intAlga <= this.minimaliAlga && intVaikai <= this.vaikai && intPalukanos){
            bustoPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiAlgosDuomenysBP').innerHTML = this.klaidosZinute;
        } else if(intPaskolosDydisPagalAlga <= this.maxPaskolosDydis && intTerminas <= this.maxTerminasMetais && intAlga >= this.minimaliAlga && intVaikai > this.vaikai && intPalukanos){
            bustoPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiVaikuDuomenysBP').innerHTML = this.klaidosZinute;
        } else{
            bustoPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiDydisDuomenysBP').innerHTML = this.klaidosZinute;
            document.getElementById('neteisingiVaikuDuomenysBP').innerHTML = this.klaidosZinute;
            document.getElementById('neteisingiAlgosDuomenysBP').innerHTML = this.klaidosZinute;
            document.getElementById('neteisingiTerminoDuomenysBP').innerHTML = this.klaidosZinute;
        }

        document.getElementById("BPresult").innerHTML = bustoPaskolosRezultatas;
    }
    patikrintiKiekGaliPasiskolinti(
        intPaskolosDydisPagalAlga: number,
        palukanos: number,
        intTerminas: number,
        intAlga: number,
        minimaliSumaVaikui: number,
        intVaikai: number) : any {
       
        if (intAlga >= this.minimaliAlga && intVaikai <=  this.vaikai){
            let   perskaičiuojamaAlga:number = intAlga - minimaliSumaVaikui * intVaikai;
            let   paskaiciuotosPalukanos: number = intPaskolosDydisPagalAlga / this.simtasProcentu * palukanos * intTerminas;
            let   grazinamaBendraPaskolosSuma: number = intPaskolosDydisPagalAlga + paskaiciuotosPalukanos;
            
            if(perskaičiuojamaAlga >= this.minimaliAlga){
                let taikomeLBFormuleGaunameSuma: number = perskaičiuojamaAlga / this.simtasProcentu * this.keturiasdesimtProcentu;
                let menesioImoka = Math.round(grazinamaBendraPaskolosSuma / intTerminas / this.dvylikaMenesiu);
                let kiekMenesiuReikesMoketi = Math.round(grazinamaBendraPaskolosSuma / taikomeLBFormuleGaunameSuma);
                let paverciameMenesiusIMetus = kiekMenesiuReikesMoketi / this.dvylikaMenesiu;
                    
                    if(paverciameMenesiusIMetus <= intTerminas){
                        return menesioImoka;
                    }else {
                    return this.zinuteAtmestaPaskola ;
                    }
            } else {
                  return `${this.zinuteAtmestaPaskola} Nes Jūsų alga permaža,pasirinkite kitokį terminą arba sumą.`;
            }
        } else if (intAlga >= this.minimaliAlga && intVaikai > this.vaikai){
             return this.zinuteAtmestaPaskola;
        } else {
            return this.zinuteAtmestaPaskola;
        }
    } 
}

class VartojimoPaskola implements Paskola{
    maxPaskolosDydis: number;
    maxTerminasMetais: number;
    paskolosDydis: number;
    paskolosTerminas: number;
    palukanos: number;
    simtasProcentu:number = 100;
    dvylikaMenesiu:number = 12;
    klaidosZinute: string = 'Suvesti neteisingi duomenys';

    constructor( maxPaskolosDydis: number, maxTerminasMetais: number, palukanos: number){
        this.maxPaskolosDydis = maxPaskolosDydis;
        this.maxTerminasMetais = maxTerminasMetais;
        this.palukanos = palukanos;
    }
    
    inicijuotiSkaiciavima():void {
        let pasirinktasdaiktoTipas: string;
        let vartojimoPaskolosRezultatas: any;
        let intPaskolosDydis: number =  parseInt((<HTMLInputElement>document.getElementById('paskolosDydisVP')).value);
        let intTerminas: number =  parseInt((<HTMLInputElement>document.getElementById('terminasVP')).value);
        let daiktoTipas =  document.getElementById('daiktoTipas') as HTMLSelectElement;
        let intPalukanos: number =  parseInt((<HTMLInputElement>document.getElementById('palukanosVP')).value);

        console.log(daiktoTipas.value);
        if (daiktoTipas.value === "automobilis"){
            pasirinktasdaiktoTipas = "automobilis";
            intPalukanos = 15;
        } else if (daiktoTipas.value === "motociklas"){
            pasirinktasdaiktoTipas = "motociklas";
            intPalukanos = 20;
        } else {
            pasirinktasdaiktoTipas = "nepasirinkta";
        }

        if(intPaskolosDydis <= this.maxPaskolosDydis && intTerminas <=  this.maxTerminasMetais && daiktoTipas.value === pasirinktasdaiktoTipas && intPalukanos) {
            let palukanuApibendrinimas = this.paskaiciuotiPalukanas(intPaskolosDydis, intTerminas,intPalukanos);
            vartojimoPaskolosRezultatas = `
            <p>Mėnesinė įmoka būtų : ${palukanuApibendrinimas} eurų.</p>
            <p>Prašomas paskolos dydis : ${intPaskolosDydis} eurų. </p>
            <p>Terminas pasirinktas : ${intTerminas} metai.</p>
            <p>Daikto tipas yra : ${pasirinktasdaiktoTipas} .</p>
            <p>Metinė palūkanų norma : ${intPalukanos} %.</p>
            `;
        }else if (intPaskolosDydis >= this.maxPaskolosDydis && intTerminas <=  this.maxTerminasMetais){
            vartojimoPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiDydisDuomenysVP').innerHTML = this.klaidosZinute;
        } else if (intPaskolosDydis <= this.maxPaskolosDydis && intTerminas >=  this.maxTerminasMetais){
            vartojimoPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingiTerminoDuomenysVP').innerHTML = this.klaidosZinute;
        }
        else if (intPaskolosDydis <= this.maxPaskolosDydis && intTerminas <=  this.maxTerminasMetais && daiktoTipas.value  === "nepasirinkta"){
            vartojimoPaskolosRezultatas = this.klaidosZinute;
            document.getElementById('neteisingaiPasirinktasDaiktoTipas').innerHTML = this.klaidosZinute;
        }
        
        

        else {
             vartojimoPaskolosRezultatas = this.klaidosZinute;
             document.getElementById('neteisingiDydisDuomenysVP').innerHTML = this.klaidosZinute;
             document.getElementById('neteisingiTerminoDuomenysVP').innerHTML = this.klaidosZinute;
        }

        document.getElementById("VPresult").innerHTML = vartojimoPaskolosRezultatas;
       
    }
    paskaiciuotiPalukanas( intPaskolosDydis: number,intTerminas: number, intPalukanos: number): number{
         let galutinesPalukanos = intPaskolosDydis / this.simtasProcentu * intPalukanos * intTerminas;
         let paskolosSumaSuPalukanom =  intPaskolosDydis + galutinesPalukanos;
         let menesioPalukanos =  parseInt((paskolosSumaSuPalukanom/ intTerminas / this.dvylikaMenesiu).toFixed(2));
         return menesioPalukanos;
    }
}

const showGPResult = (): void => {
    let greitojiPaskola: Paskola = new GreitojiPaskola(5000, 2, 20);
    greitojiPaskola.inicijuotiSkaiciavima();
}

const showBPResult = (): void => {
    let bustoPaskola: Paskola = new BustoPaskola(200000, 30, 650, 15, 2);
    bustoPaskola.inicijuotiSkaiciavima();
}

const showVPResult = (): void => {
    let vartojimoPaskola: Paskola = new VartojimoPaskola(10000, 5, 10);
    vartojimoPaskola.inicijuotiSkaiciavima();
}