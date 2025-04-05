import React from 'react'

export default function Search({ value, newValue }) {
    return (
        <div>
            <div className="input-group">
                <input className="form-control border" type="search" value={value} onChange={(e) => { newValue(e.target.value) }} placeholder="search quotes by author name" id="example-search-input" />
            </div>
        </div>
    )
}
