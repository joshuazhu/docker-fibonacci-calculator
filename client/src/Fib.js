import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = () => {
    const [values, setValues] = useState({});
    const [indexes, setIndexes] = useState([]);
    const [index, setIndex] = useState('');

    
    useEffect(() => {
        const fetchValues = async () => {
            const fetchedValues = await axios.get('/api/values/current');
            setValues(fetchedValues.data);
        };
    
        const fetchIndexes = async () => {
            const seenIndexes = await axios.get('/api/values/all');
            setIndexes(seenIndexes.data);
        };
    
        fetchValues();
        fetchIndexes();
    }, []);

    const renderIndexes = () => {
        return indexes.map(({ number }) => number).join(', ');
    }

    const renderValues = () => {
        const indexKeys = Object.keys(values);

        return indexKeys.map(indexKey => (
            <div key={indexKey}>
                For index {indexKey} I calculated {values[indexKey]}
            </div>
        ));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('/api/values', { index });
        setIndex('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your index:</label>
                <input
                    value={index}
                    onChange={e => setIndex(e.target.value)}
                />
                <button>Submit</button>
            </form>

            <h3>Indexes 1 has seen:</h3>
            {renderIndexes()}

            <h3>Calculated</h3>
            {renderValues()}
        </div>
    )
}

export default Fib;