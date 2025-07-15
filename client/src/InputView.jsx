import { NumericFormat } from "react-number-format"
import { Link } from 'react-router-dom';
import { useState } from 'react';

import InputField from './InputField'
import logo from './assets/logo2.png';
import './InputView.css'


function InputView({setFlag}) {

    const [numInputs, setNumInputs] = useState(Array(10).fill(0))
    const [selInputs, setSelInputs] = useState(Array(6).fill(""))
    const [error, setError] = useState(null)
    

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // console.log("NumInputs:"+numInputs)
        // console.log("SelInputs:"+selInputs)
        // console.log("json:",JSON.stringify({ values: numInputs, timeUnits: selInputs }))

        setFlag((prev) => !prev)

        for (let i = 0; i < 10; i++){
            if (numInputs[i] === undefined || Number.isNaN(numInputs[i])){
                numInputs[i] = 0
            }
            if (i <= 5 && (selInputs[i] == "" || selInputs[i] === undefined)){
                selInputs[i] = "per nothing"
            }
        }

        try {
            setError(null);
            const response = await fetch('http://localhost:5000/api/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ values: numInputs, timeUnits: selInputs }),
            });

            //if (!response.ok) throw new Error('Network response was not ok');

            const chartData = await response.json();
            console.log(chartData)
            
        } catch (err) {
            setError('Failed to fetch chart data from backend.');
            console.log(err)
        }
    };

    const updateNumInputs = (newVal, index) => {
        const newInputs = [...numInputs]
        newInputs[index] = newVal
        setNumInputs(newInputs)
    };

    const updateSelInputs = (newVal, index) => {
        const newSelInputs = [...selInputs]
        newSelInputs[index] = newVal
        setSelInputs(newSelInputs)
    }

    return (
        <div className="container">
            <div className='left'>

                <div className='field-box'>
                    <h2>Income</h2>
                    <InputField name="Job" numSetter={updateNumInputs} selSetter={updateSelInputs} index={0}/>
                    <InputField name="Allowance" numSetter={updateNumInputs} selSetter={updateSelInputs} index={1}/>
                    <InputField name="Other" numSetter={updateNumInputs} selSetter={updateSelInputs} index={2}/>
                 
                    <h2>Expenses</h2>
                    <InputField name="Snacks" numSetter={updateNumInputs} selSetter={updateSelInputs} index={3}/>
                    <InputField name="Games" numSetter={updateNumInputs} selSetter={updateSelInputs} index={4}/>
                    <InputField name="Subscriptions" numSetter={updateNumInputs} selSetter={updateSelInputs} index={5}/>
                 
                    <h2>Savings</h2>
          
                    <h3>Cash</h3>
                    <NumericFormat
                        thousandSeparator={true}
                        prefix="$"
                        defaultValue={0}
                        className='savings-nFormat'
                        onValueChange={(val) => updateNumInputs(val.floatValue, 6)}
                        onFocus={(e) => e.target.select()}
                    />
                                         
                    <h3>Gift Cards</h3>
                    <NumericFormat
                        thousandSeparator={true}
                        prefix="$"
                        defaultValue={0}
                        className='savings-nFormat'
                        onValueChange={(val) => updateNumInputs(val.floatValue, 7)}
                        onFocus={(e) => e.target.select()}
                    />
                    
                    <div className='field-box-row'>

                        <div id="bank-savings-wrap">
                            <h3>Bank Account (Savings)</h3>
                            <div id="rag">
                                <NumericFormat
                                    thousandSeparator={true}
                                    prefix="$"
                                    defaultValue={0}
                                    id='bank-savings-nf'
                                    className='savings-nFormat'
                                    onValueChange={(val) => updateNumInputs(val.floatValue, 8)}
                                    onFocus={(e) => e.target.select()}
                                />

                            </div>
                            
                        </div>
                        
                        <div id="apy-wrap">
                            <h3>Interest Rate (APY)</h3>
                            <div id="gar">
                                <NumericFormat
                                    thousandSeparator={false}
                                    suffix="%"
                                    defaultValue={0}
                                    id='apy-savings-nf'
                                    className='savings-nFormat'
                                    onValueChange={(val) => updateNumInputs(val.floatValue, 9)}
                                    onFocus={(e) => e.target.select()}
                                />
                            </div>
                            
                        </div>
                    </div>
                    <Link to="/another">
                        <button onClick={handleSubmit}>Submit & go to next page</button>
                    </Link>
                </div>
            </div>
            <div className="right">
                <img src={logo} alt="Brookline High School Fintech Club Logo" />
            </div>
        </div>
        
    );
}

export default InputView;