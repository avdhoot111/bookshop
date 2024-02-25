import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [values, setValues] = useState({
        publisher: '',
        name: '',
        price: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5002/create', values)
        .then(res => navigate('/'))
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex align-items-center flex-column mt-3'>
            <h2>Add Book</h2>
            <form className='w-50' onSubmit={handleSubmit}>
                <div class="mb-3 mt-3">
                    <label for="publisher" class="form-label">Publisher:</label>
                    <input type="text" onChange={(e) => setValues(prev => ({...prev, publisher: e.target.value}))} class="form-control" id="publisher" placeholder="Enter publisher" name="publisher" />
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Price:</label>
                    <input type="price" onChange={(e) => setValues(prev => ({...prev, price: e.target.value}))} class="form-control" id="price" placeholder="Enter price" name="price" />
                </div>
                <div class="mb-3">
                    <label for="name" class="form-label">Book Name:</label>
                    <input type="text" class="form-control" onChange={(e) => setValues(prev => ({...prev, name: e.target.value}))} id="name" placeholder="Enter book name" name="name" />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Create