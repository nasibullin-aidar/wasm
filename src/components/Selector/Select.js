import React, { useState, useMemo, useCallback } from 'react'
import './Select.sass'

function Selector({ onChange, options, value, label }) {
    const [closed, setClosed] = useState(true)
    const [selected, setSelected] = useState(options.find(option => option.value === value))

    const closedHandle = (() => {
        setClosed(!closed)
    })

    const onSelect = useCallback((item) => {
        setSelected(item)
        setClosed(true)
        onChange(item.value)
    }, [])

    const selectOptions = useMemo(() => options.filter(option => option.value !== value), [options, selected]);

    return (
        <div className="select header__select">
            <p className="select__label">{label}</p>
            <div onClick={closedHandle} className="select__header">
                <span className="select__current">{selected ? selected.label : "Выбрать"}</span>
                <div className="select__icon">
                    <img src="images/arrow.png" alt="стрелка" />
                </div>
            </div>
            {closed ? null :
                <div className="select__body">
                    {selectOptions.map(item => (
                        <p
                            key={item.value}
                            onClick={() => onSelect(item)}
                            className="select__item"
                        >
                            {item.label}
                        </p>
                    ))}
                </div>
            }
        </div>
    )
}

export default Selector
