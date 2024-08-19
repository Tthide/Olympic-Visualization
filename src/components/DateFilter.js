import React from 'react'
import ReactSlider from 'react-slider'
import '../styles/DateFilter.css';


const DateFilter = ({ handleChange }) => {

    return (
        <div className="slider-container">

            <div className="slider-label">             
                <label id="slider-label-first">1896</label>
                <label id="slider-label-second">2021</label>
            </div>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                marks={[1900, 1950, 2000]}
                markClassName="mark"
                defaultValue={[1896, 2021]}
                min={1896}
                max={2021}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                ariaValuetext={state => `Thumb value ${state.valueNow}`}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                minDistance={0}
            />
        </div>




    )
}

export default DateFilter

