import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const {id} = useParams();
    const [values, setValues] = useState({
        publisher: '',
        name: '',
        price: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5002/getRecord/' + id)
            .then((res) => setValues({...values, publisher: res.data.data[0].publisher, name: res.data.data[0].name, price: res.data.data[0].price}))
            .catch((err) => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values, 'beforeUpdate');
        axios.put('http://localhost:5002/update/' + id, values)
        .then(res => navigate('/'))
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex align-items-center flex-column mt-3'>
    <h2>Update Book</h2>
    <form className='w-50' onSubmit={handleSubmit}>
        <div class="mb-3 mt-3">
            <label for="publisher" class="form-label">Publisher:</label>
            <input type="text" value={values.publisher} onChange={(e) => setValues(prev => ({...prev, publisher: e.target.value}))} class="form-control" id="publisher" placeholder="Enter publisher" name="publisher" />
        </div>
        <div class="mb-3">
            <label for="price" class="form-label">Price:</label>
            <input type="price" value={values.price} onChange={(e) => setValues(prev => ({...prev, price: e.target.value}))} class="form-control" id="price" placeholder="Enter price" name="price" />
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">Book Name:</label>
            <input type="text" value={values.name} class="form-control" onChange={(e) => setValues(prev => ({...prev, name: e.target.value}))} id="name" placeholder="Enter book name" name="name" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
  )
}

export default Update