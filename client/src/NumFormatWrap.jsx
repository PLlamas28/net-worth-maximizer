import { NumericFormat } from "react-number-format"
import './NumFormatWrap.css'

function NumFormatWrap({ name, prefix, suffix, sep }) {
    return (
        <div className='box-wrapper'>
            <h3>{name}</h3>
            <NumericFormat
                thousandSeparator={sep}
                prefix={prefix}
                suffix={suffix}
                defaultValue={0}
                id='form'
                className='nFormat'
                onValueChange={(val) => handleChange(val.floatValue)}
                onFocus={(e) => e.target.select()}
            />

        </div>
        
    );
}

export default NumFormatWrap;