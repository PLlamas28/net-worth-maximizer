import './InputField.css'
import { NumericFormat } from "react-number-format"
import Select from "react-select"
import { useState } from 'react';

export default function InputField({name, numSetter, selSetter, index}) {
    const options = [
        { value: '0', label: 'per hour' },
        { value: '1', label: 'per day' },
        { value: '2', label: 'per week' },
        { value: '3', label: 'per month' },
        { value: '4', label: 'per year' },
    ];

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? 'black' : '#8b8c8f',
            boxShadow: state.isFocused ? '0 0 0 1px grey' : 'none',
            '&:hover': {
                borderColor: 'black',
            },
            fontSize: '.8125rem',     // Font size for input
            color: '#333',         // Font color (might be ignored here, see below)
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#333',         // Font color for selected value
            fontSize: '.8125rem',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#888',         // Placeholder text color
            fontSize: '.8125rem',
            fontStyle: 'italic',
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: '.8125rem',
            color: state.isSelected ? 'white' : '#333',  // Selected = white text
            backgroundColor: state.isSelected ? 'grey' : 'white',
            '&:hover': {
                backgroundColor: '#b5eff2', // on hover
            },
        }),
    };

    // const [val, setVal] = useState(null);
    // const [selectVal, setSelectVal] = useState('')

    const handleChange = (val) => {
        numSetter(val, index)
    }

    const handleSelectChange = (s) => {
        selSetter(s, index)
        console.log(s)
    }

    return (
        <div className='big-field'>
            <div><h3>{name}</h3></div>
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
                    
                    className='nFormat'
                    onValueChange={(val) => handleChange(val.floatValue)}
                    onFocus={(e) => e.target.select()}
                />

                <Select
                    options={options}
                    placeholder="Rate"
                    
                    onChange={(val) => handleSelectChange(val.label)}
                    styles={customStyles}
                />
                
            </div>
            {/* <div>Number:{val}</div>
            <div>Selection: {selectVal}</div> */}
        </div>
    );
}