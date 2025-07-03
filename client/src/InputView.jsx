import { NumericFormat } from "react-number-format"
import { Link } from 'react-router-dom';

import InputField from './InputField'
import NumFormatWrap from "./NumFormatWrap";
import './InputView.css'


function InputView() {
    return (
        <div className='input-parent'>

            <div className='field-box'>
                <h2>Income</h2>
                <InputField name="Job"/>
                <InputField name="Allowance"/>
                <InputField name="Other"/>
            </div>

            <div className='field-box'>
                <h2>Expenses</h2>
                <InputField name="Snacks"/>
                <InputField name="Games"/>
                <InputField name="Subscriptions"/>
            </div>

            <div className='field-box'>
                <h2>Savings</h2>

                <div>
                    <h3>Cash</h3>
                    <NumericFormat
                        thousandSeparator={true}
                        prefix="$"
                        defaultValue={0}
                        className='savings-nFormat'
                        onValueChange={(val) => handleChange(val.floatValue)}
                        onFocus={(e) => e.target.select()}
                    />
                </div>
                
                <div>
                    <h3>Gift Cards</h3>
                    <NumericFormat
                        thousandSeparator={true}
                        prefix="$"
                        defaultValue={0}
                        className='savings-nFormat'
                        onValueChange={(val) => handleChange(val.floatValue)}
                        onFocus={(e) => e.target.select()}
                    />
                </div>
                    
                

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
                                onValueChange={(val) => handleChange(val.floatValue)}
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
                                onValueChange={(val) => handleChange(val.floatValue)}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                        
                    </div>
                </div>

                
                
            </div>

            <Link to="/another">
                <button>Submit & go to next page</button>
            </Link>
            


        </div>
        
    );
}

export default InputView;