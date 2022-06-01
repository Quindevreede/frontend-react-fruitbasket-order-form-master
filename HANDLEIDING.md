HANDLEIDING FRUITBASKET BEZORG-SERVICE:
---------------------------------------

STAP 0 - OPZET :
---

## Applicatie starten
Als je het project gecloned hebt naar jouw locale machine, installeer je eerst de `node_modules` door het volgende commando in de terminal te runnen:

`npm install`

Wanneer dit klaar is, kun je de applicatie starten met behulp van:

`npm start`

---

Je App.js is momenteel nog bijna leeg en ziet er zo uit:
---
import React from 'react';
import './App.css';

function App() {
  return (
    <>
      <h1>Fruitmand bezorgservice</h1>
    </>
  );
}

export default App;

We gaan voor deze Site FRUITCOUNTERS MAKEN:

### Randvoorwaarden fruit-counters
* Je maakt gebruik van de useState hook van React om de hoeveelheden bij te houden
* Klanten hebben de vrijheid om te kiezen tussen vier typen fruit:
  1. Bananen 🍌
  2. Aarbeien 🍓
  3. Appels 🍏
  4. Kiwi's 🥝
* Elk type fruit heeft twee buttons: één die de hoeveelheid verhoogd (`+`) en één die de hoeveelheid verlaagd (`-`)
* De hoeveelheid mag door de gebruiker niet lager gezet worden dan 0
* De hoeveelheid geselecteerde fruittypes wordt bij iedere update getoond aan de gebruiker
* Er is ook een reset button, die alle counters weer op 0 zet.
--------------------------

STAP 1 - OPZET FRUIT COUNTERS :
---

stap 1.1 --

We gaan eerst de ruimtes voor onze FRUIT BUTTONS maken in de App.js:
import React from 'react';
import './App.css';

function App() {

    return (
        <>
            <h1>Fruitmand bezorgservice</h1>
            <section className="fruit-counters">
                <article>
                    <h2>🍓 Aardbeien</h2>
                </article>

                <article>
                    <h2>🍌 Bananen</h2>
                </article>

                <article>
                    <h2>🍏 Appels</h2>
                </article>

                <article>
                    <h2>🥝 Kiwi's</h2>
                </article>
                <Button type="button">Reset</Button>
            </section>
        </>

  );
}

export default App;

--> We hebben dus eerst heel simpel de <article> ELEMENTEN erin gezet waar de FRUIT COUNTERS
    in komen te staan.

stap 1.2 --

Vervolgens gaan we voor onze 4 fruit soorten STATE aanmaken zodat de gebruiker de waardes die
daarbij komen te staan kan manipuleren. Je zet deze altijd direct onder function App():

function App() {
  const [strawberries, setStrawberries] = useState(0);
  const [bananas, setBananas] = useState(0);
  const [apples, setApples] = useState(0);
  const [kiwis, setKiwis] = useState(0);

Dus de default STATE is 0 en met setState kan de waarde veranderd worden.

stap 1.3 --

Nu gaan we een APART COMPONENT maken voor een algemene BUTTON. Deze gaan we op
meerdere plekken gebruiken, dus de waardes van de BUTTON laten we zo veel mogelijk
toepasbaar voor meerdere functies:

import React from 'react';

function Button({ clickHandler, children, type, disabled }) {
  return (
    <button
      onClick={clickHandler}
      type={type}
      disabled={disabled || false}
    >
      {children}
    </button>
  );
}

export default Button;

Zoals je kunt zien krijgt deze BUTTON dus meerdere waarden en functies mee:
- clickhandler = de EVENT LISTENER die wat doet als je op de knop drukt
- type = soort button (we gaan een "button" type en een "submit" type gebruiken)
- disabled = we hebben hier 'disabled' IF > disabled IS-GELIJK-AAN false
{children} is de waarde (string met de text op de button)

Dus kortom; een vrij algemene <button> in een apart COMPONENT die we in
andere .js files kunnen IMPORTEREN om te gebruiken

stap 1.4 --

Deze noemen we Counter.js en zetten die in een aparte map:
src/components/Counter.js

Deze gaat er zo uit zien:
-
import React from 'react';
import Button from './Button';

function Counter({ setFruitCount, fruitCount }) {
  return (
    <>
      <Button type="button" disabled={fruitCount === 0} clickHandler={() => setFruitCount(fruitCount - 1)}>
        -
      </Button>
      <p>{fruitCount}</p>
      <Button type="button" clickHandler={() => setFruitCount(fruitCount + 1)}>
        +
      </Button>
    </>
  );
}

export default Counter;

We hebben hier met
import Button from './Button';
Het Button.js COMPONENT GEIMPORTEERD zodat we deze kunnen gebruiken in
dit COMPONENT die we dan WEER IMPORTEREN in de App.js(inception!)

We hebben hierin een BUTTON voor MINUS gemaakt:
      <Button type="button" disabled={fruitCount === 0} clickHandler={() => setFruitCount(fruitCount - 1)}>
        -
      </Button>
deze krijgt bij type=button, bij disabled staat ie op DISABLED als de fruitCount op 0 staat
(Je kunt dus niet de teller op -1 zetten, bij clickHandler hebben we er voor gezorgd
(met een lege function zodat ie niet automatisch gaat) dat
als je op deze knop drukt de counter -1 gaat (je spreekt de setFruitCount aan van de Counter() FUNCTION
waar deze BUTTON instaat, deze zegt HAAL MET setFruitCount ÉÉN van HUIDIGE fruitCount AF,
behalve dus als waarde op 0 staat) en de {children} is "-1" (text op button)

TUSSEN de twee BUTTONS in komt de HUIDIGE STAND({fruitCount}) te staan in een <p></p>

We hebben ook een BUTTON voor PLUS gemaakt:
      <p>{fruitCount}</p>
      <Button type="button" clickHandler={() => setFruitCount(fruitCount + 1)}>
        +
      </Button>
deze krijgt bij type=button, bij disabled staat ie nooit(want je mag ALTIJD optellen,
bij clickHandler hebben we er voor gezorgd (met een lege function zodat ie niet automatisch gaat)
dat als je op deze knop drukt de counter +1 gaat omdat ie dus weer de setFruitCount
uit de Counter function({ setFruitCount, fruitCount }) aanspreekt die de HUIDIGE(fruitCount)
dus met ÉÉN VERHOOGD. De {children} is "-1" (text op button)

stap 1.5 --

We gaan weer terug naar App.js

We gaan de Counter IMPORTEREN in de App.js:
import Counter from './components/Counter';

Nu kun je het Counter Component in je <article>s plaatsen
                    <Counter
                        fruitCount={strawberries}
                        setFruitCount={setStrawberries}
                    />
En hiermee kan de gebruiker dus setFruitCount doen op de site
Hierboven hebben we de Counter voor aardbeien, maar we zetten er dus één op elke soort fruit

stap 1.6 --

We hebben nog een CANCEL BUTTON nodig die alle waardes die zijn opgeteld of afgetrokken weer op 0 zet:
- We maken eerst een FUNCTION die dat doet:
-
  function resetFruits() {
    setStrawberries(0);
    setBananas(0);
    setApples(0);
    setKiwis(0);
  }
- Daarna IMPORTEREN we de Button.js ook in App.js zodat we die kunnen gebruiken:
  import Button from './components/Button';
- Daarna maken we de BUTTON en geven bij de EVENT LISTENER de FUNCTION {resetFruits} mee:
-
        </article>
        <Button type="button" clickHandler={resetFruits}>Reset</Button>
      </section>

stap 1.7 --

Als we nu op de webpage kijken zien we dat alles tegen de linker-rand staat, dus we maken wat
nieuwe stijl aanpassingen aan in App.css :

* {
    box-sizing: border-box;
}

#root {
    display: flex;
    flex-direction: column;
    align-items: center;
}

article {
    display: flex;
    align-items: baseline;
    justify-content: center;
    border: 1px solid black;
    border-radius: 4px;
    margin: 8px 0;
    padding: 4px 8px;
    width: 100%;
}

.fruit-counters article button {
    margin: 0 8px;
    padding: 2px 8px;
    font-size: 16px;
    width: auto;
}

.fruit-counters button {
    margin: 8px 0;
    width: 100%;
    padding: 8px 0;
}

.fruit-counters {
    width: 500px;
    padding: 8px 16px;
    margin: 8px;
    border: 1px solid #ededed;
}

Let op dat we dus de <section> waarin de <article>, <counter> en <button> staat dus ook de CLASSNAME fruit-counter heeft

--- DIT WAS STAP 1 EN WE HEBBEN NU DUS DE COUNTERS GEMAAKT! HIERBOVEN ZIE JE DUS DE CSS EN COUNTER EN BUTTON COMPONENTEN
    BLIJVEN HETZELFDE, WE GAAN IN STAP 2 WEL App.js AANPASSEN MAAR --NU-- ZIET App.js ER DUS ZO UIT:

import React, { useState } from 'react';
import './App.css';
import Button from "./components/Button";
import Counter from "./components/Counter";

function App() {
    const [strawberries, setStrawberries] = useState(0);
    const [bananas, setBananas] = useState(0);
    const [apples, setApples] = useState(0);
    const [kiwis, setKiwis] = useState(0);

    function resetFruits() {
        setStrawberries(0);
        setBananas(0);
        setApples(0);
        setKiwis(0);
    }

    return (
        <>
            <h1>Fruitmand bezorgservice</h1>
            <section className="fruit-counters">
                <article>
                    <h2>🍓 Aardbeien</h2>
                    <Counter
                        fruitCount={strawberries}
                        setFruitCount={setStrawberries}
                    />
                </article>
                <article>
                    <h2>🍌 Bananen</h2>
                    <Counter
                        fruitCount={bananas}
                        setFruitCount={setBananas}
                    />
                </article>
                <article>
                    <h2>🍏 Appels</h2>
                    <Counter
                        fruitCount={apples}
                        setFruitCount={setApples}
                    />
                </article>
                <article>
                    <h2>🥝 Kiwi's</h2>
                    <Counter
                        fruitCount={kiwis}
                        setFruitCount={setKiwis}
                    />
                </article>
                <Button type="button" clickHandler={resetFruits}>Reset</Button>
            </section>

        </>

  );
}

export default App;
------------------------------------------------------------------------------------------------------------------------

STAP 2 - OPZET FORM FUNCTIONS:
---

WE willen nu dus ook een FORM waarin de gebruiker contact gegevens kan invoeren,
zodat we het fruit daarnaar kunnen versturen.

stap 2.1 --

We beginnen met App.js, daar maken we een een uitgebreide FORM:

We beginnen met een apart COMPONENT aanmaken die we gebruiken voor de invul velden voor de FORM in App.js
- Dus maak eerst in src/components een JS BESTAND en noem die InputField.js
- Vul dit bestand met de volgende code:
-
import React from 'react';

function InputField({ name, inputType, label, value, changeHandler}) {
  return (
    <>
      <label htmlFor={`${name}-field`}>{label}</label>
      <input
        name={name}
        id={`${name}-field`}
        type={inputType}
        value={value}
        onChange={changeHandler}
      />
    </>
  );
}

export default InputField;

WE HEBBEN HIER DUS;

een COMPONENT inputField met PROPERTIES
- name (deze wordt ingevuld bij 'name')
- name (deze wordt OOK ingevuld bij 'id' met -field erachter geplakt)
- inputType (deze wordt ingevuld bij 'type')
- label (deze wordt ingevuld bij 'label')
- value (deze wordt ingevuld bij 'value')
- changeHandler (deze wordt ingevuld bij 'onChange' EVENT LISTENER)

Dit COMPONENT RETURNED een object waar EERST het LABEL-ID wordt bepaald met een TEMPLATE LITERAL
DUS VERGEET de ` ` NIET! (met de template literal plakken we dus waarde van {name} met String ' -field' aan elkaar)
the FOR attribute specifies which form element a label is bound to, in REACT doen we dit met HTMLFOR

De rest wijst vanzelf en je kan KIEZEN welke van de PROPERTIES je toepast of niet

stap 2.2 --

We gaan nu de USE-STATE maken voor [formState, setFormState], HIERMEE kunnen we met ÉÉN OBJECT alle FORM stukken
invullen met de PROPERTIES die we dus in InputField.js COMPONENT hebben gezet.

We gaan de useState() maken in App.js:

Zet de useState() op deze manier onder de eerdere useState() die we voor de FRUIT COUNTER hadden gemaakt:
-
  const [formState, setFormState] = useState({
    firstname: '',
    lastname: '',
    age: 0,
    zipcode: '',
    deliveryFrequency: 'week',
    deliveryTimeslot: 'daytime',
    remark: '',
    agreeTerms: false,
  })

Je ziet hier dus dat we elke keer de 'NAME' van het InputField() COMPONENT op leeg of default hebben staan.
We moeten dus een ALGEMENE FUNCTION maken die zorgt dat we met setFormState de lege/default state kunnen veranderen.

stap 2.3 --

Je zet de FUNCTION handleFormChange(e) {} in je App():
-
  function handleFormChange(e) {
    const inputName = e.target.name;
    const inputValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setFormState({
      ...formState,
      [inputName]: inputValue,
    })
  }

Met deze FUNCTION die op alle FORM ELEMENTEN toepasbaar is verwerken we dus wat de gebruiker
invult en zorgt setFormState dat de waardes worden veranderd.

Er wordt in deze Function éém van de twee const variables aangemaakt:
    const inputName = e.target.name;
    const inputValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    e.target.name --- Als één van de FORM ELEMENTEN op de site wordt ingevuld door de gebruiker
                      wordt e(=input gebruiker) in target.name(dus het betreffende FORM ELEMENT waar input plaats vind)
                      aangesproken.

    BINNEN de handleFormChange(e) staat setFormState die de LAATST ...formState aangesproken(door gebruiker)
    formState van waarde veranderd. Dit gebeurt in de meeste gevallen voor de FORM ELEMENTEN ---> BEHALVE:
    voor de CHECKBOX dus die zetten we APART erbij met een korte If/Else(ternary operator)

    Kijk goed: de inputName waarde is voor 90% van de FORM ELEMENTEN en de inputValue is voor de CHECKBOX

stap 2.4 --

De laatste FUNCTION die we aanmaken zorgt ervoor dat de pagina NIET VERVERST als er op SUBMIT gedrukt wordt op de site
en gooit met console.log de gegevens zijn ingevuld in de CONSOLE worden GELOGD. (één console.log voor de FORM =formState
en één console.log voor wat er OP HET MOMENT van SUBMIT op de COUNTERS staat. De FUNCTION ziet er als volgt uit:
-
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formState);
    console.log(`Fruitmand bestelling - aardbeien: ${strawberries}, bananen: ${bananas}, appels: ${apples}, kiwi's: ${kiwis}`);
  }

- e.preventDefault() voorkomt dus verversing van pagina
- console.log(formState) logt dus de FORM waarden
- console.log Fruitmand bestelling zet met TEMPLATE LITERAL (vergeet `` niet) de COUNTER WAARDEN van de verschillende fruit erin
------------------------------------------------------------------------------------------------------------------------

STAP 3 - OPZET FORM :
---

stap 3.1 --
We hebben nu alles wat we nodig hebben om de FORM ELEMENTEN aan te maken
We beginnen bij Voornaam
                Achternaam
                Leeftijd
                Postcode
Dit zet je zo in je App.js bij return ONDER de <article> met <Counter> elementen:

      <form onSubmit={handleSubmit}>
        <section>
           <InputField name="firstname" label="Voornaam" inputType="text" value={formState.firstname} changeHandler={handleFormChange} />
        </section>
        <section>
          <InputField name="lastname" label="Achternaam" inputType="text" value={formState.lastname} changeHandler={handleFormChange} />
        </section>
        <section>
          <InputField name="age" label="Leeftijd" inputType="number" value={formState.age} changeHandler={handleFormChange} />
        </section>
        <section>
          <InputField name="zipcode" label="Postcode" inputType="text" value={formState.zipcode} changeHandler={handleFormChange} />
        </section>
        <section>
          <label htmlFor="delivery-field">Bezorgfrequentie</label>
        </section>

We zetten dus elke keer bij VALUE {formState.waarde} en bij de EVENT HANDLER {handleFormChange}
om de waarde van value met setFormChange te veranderen

stap 3.2 --
Nu zetten we het volgende gedeelte van de FORM eronder:
-
        <section>
          <select
            name="deliveryFrequency" id="delivery-field"
            value={formState.deliveryFrequency}
            onChange={handleFormChange}
          >
            <option value="week">Iedere week</option>
            <option value="two-week">Om de week</option>
            <option value="month">Iedere maand</option>
          </select>
        </section>
        <section>
        <input
          type="radio"
          value="daytime"
          name="deliveryTimeslot"
          id="timeslot-field-daytime"
          checked={formState.deliveryTimeslot === 'daytime'}
          onChange={handleFormChange}
        />
        <label htmlFor="timeslot-field-daytime">Overdag</label>
          <input
            type="radio"
            value="evening"
            checked={formState.deliveryTimeslot === 'evening'}
            onChange={handleFormChange}
            name="deliveryTimeslot"
            id="timeslot-field-evening"
          />
          <label htmlFor="timeslot-field-evening">'s Avonds</label>
        </section>

        We zetten dus elke keer bij VALUE {formState.waarde} en bij de EVENT HANDLER {handleFormChange}
        om de waarde van value met setFormChange te veranderen

stap 3.3 --
Nu zetten we het volgende gedeelte van de FORM eronder:
-
        <section>
          <label htmlFor="remark-field">Opmerking</label>
          <textarea
            name="remark-field"
            id="remark-field"
            value={formState.remark}
            onChange={handleFormChange}
            rows={6}
            cols={40}
          />
        </section>
        <section>
          <input
            type="checkbox"
            name="agree-field"
            id="agree-field"
            value={formState.agreeTerms}
            onChange={handleFormChange}
          />
          <label htmlFor="agree-field">Ik ga akkoord met de voorwaarden</label>
        </section>
        <Button type="submit">Verzend</Button>
      </form>

Hier hebben we dus een TEXT-FIELD en de beruchte CHECKBOX

ALS LAATSTE HEBBEN WE BUTTON DIE DE GEHELE FORM SAMEN MET DE COUNTER STAND VERZEND
(met FUNCTION handleSubmit <form onSubmit={handleSubmit}>)

Nu moeten we wat kleine styling toepassen door het volgende erbij te zetten
(LET OP er kunnen delen met de bestaande CSS samengevoegd worden):

form button {
    margin: 8px 0;
    width: 100%;
    padding: 8px 0;
}

form,
.fruit-counters {
    width: 500px;
    padding: 8px 16px;
    margin: 8px;
    border: 1px solid #ededed;
}

textarea {
    display: block;
}

form section {
    margin: 20px 0 0 0;
}

label ~ input[type="text"],
label ~ input[type="number"] {
    margin-left: 8px;
    width: 300px;
}

.error {
    font-size: 12px;
    color: red;
    margin: 4px 0;
}






