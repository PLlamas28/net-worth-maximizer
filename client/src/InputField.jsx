import './InputField.css'
import { NumericFormat } from "react-number-format"
import Select from "react-select"
import { useState } from 'react';

export default function InputField() {
    const options = [
        { value: '1', label: 'per hour' },
        { value: '2', label: 'per day' },
        { value: '3', label: 'per week' },
        { value: '4', label: 'per month' },
        { value: '5', label: 'per year' },
    ];
    const [val, setVal] = useState(null);
    const [selectVal, setSelectVal] = useState('')

    const handleChange = (val) => {
        setVal(val)
    }

    const handleSelectChange = (s) => {
        setSelectVal(s)
        console.log(s)
    }

    return (
        <>
            <div>Job</div>
            <div className='input-field'>
                {/* <form action="" id="form" method="">
                    <label htmlFor="amount">Enter Amount:</label>
                    <div className="flex">
                        <span className="currency">$</span>
                        <input id="amount" name='amount' type="text" maxLength={15} />
                    </div>
                </form> */}
                
                <NumericFormat
                    thousandSeparator={true}
                    prefix={'$'}
                    defaultValue={0}
                    id='form'
                    className='nFormat'
                    onValueChange={(val) => handleChange(val.floatValue)}
                />

                <Select
                    options={options}
                    placeholder="Select a rate"
                    id="selection"
                    onChange={(val) => handleSelectChange(val.label)}

                />
                
            </div>
            <div>Number:{val}</div>
            <div>Selection: {selectVal}</div>
            <a href="./another">click here to go to diff page</a>
        </>
    );
}