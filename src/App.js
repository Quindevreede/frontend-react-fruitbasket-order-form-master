import React, { useState } from 'react';
import Button from './components/Button';
import Counter from './components/Counter';
import InputField from './components/InputField';
import './App.css';

function App() {
    const [strawberries, setStrawberries] = useState(0);
    const [bananas, setBananas] = useState(0);
    const [apples, setApples] = useState(0);
    const [kiwis, setKiwis] = useState(0);

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

    function handleFormChange(e) {
        const inputName = e.target.name;
        const inputValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        setFormState({
            ...formState,
            [inputName]: inputValue,
        })
    }

    function resetFruits() {
        setStrawberries(0);
        setBananas(0);
        setApples(0);
        setKiwis(0);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formState);
        console.log(`Fruitmand bestelling - aardbeiden: ${strawberries}, bananen: ${bananas}, appels: ${apples}, kiwi's: ${kiwis}`);
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
                <section>
                    <label htmlFor="remark-field">Opmerking</label>
                    <textarea
                        name="remark-field"
                        id="remark-field"
                        defaultValue={formState.remark}
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
                <Button                     disabled={formState.agreeTerms === false}
                                            type="submit">Verzend</Button>
            </form>
        </>
    );
}

export default App;
