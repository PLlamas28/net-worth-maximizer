import { NumericFormat } from "react-number-format"
import { Link } from 'react-router-dom';

import InputField from './InputField'
import NumFormatWrap from "./NumFormatWrap";
import './InputView.css'


function InputView() {
    return (
        <div className='input-parent'>

            <div className='field-box'>
                <h1>Income</h1>
                <InputField name="Job"/>
                <InputField name="Allowance"/>
                <InputField name="Other"/>
            </div>

            <div className='field-box'>
                <h1>Expenses</h1>
                <InputField name="Snacks"/>
                <InputField name="Games"/>
                <InputField name="Subscriptions"/>
            </div>

            <div className='field-box'>
                <h1>Savings</h1>
                <div className='field-box-row'>
                    <NumFormatWrap name="Cash" prefix="$" suffix="" sep={true}/>
                    <NumFormatWrap name="Gift cards" prefix="$" suffix="" sep={true}/>
                </div>

                <div className='field-box-row'>
                    <NumFormatWrap name="Savings" prefix="$" suffix="" sep={true}/>
                    <NumFormatWrap name="Interest Rate (APY)" prefix="" suffix="%" sep={false}/>
                </div>

                <Link to="/another">
                    <button>Submit & go to next page</button>
                </Link>
                
                
            </div>

            
            


        </div>
        
    );
}

export default InputView;