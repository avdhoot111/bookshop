import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const Books = () => {
    const [allBooks, setAllBooks] = useState([]);

    useEffect(() => {
        console.log(allBooks, 'allbooks');
    }, [allBooks])

    useEffect(() => {
        axios.get('http://localhost:5002/')
            .then((res) => setAllBooks(res.data.data))
            .catch((err) => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:5002/delete/' + id )
            .then(res => window.location.reload())
            .catch((err) => console.log(err))
    }

    return (
        <div className='container mt-5'>
            <Link to={'/create'} className='btn btn-success'>Create Book</Link>
            <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Publisher</th>
                    <th scope="col">Book Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                   allBooks?.length > 0 ? allBooks?.map((book) => 
                    <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.publisher}</td>
                            <td>{book.name}</td>
                            <td>{book.price}</td>
                            <td>
                                <Link to={`/update/${book.id}`} type='button' className='btn btn-info btn-sm me-2'>Update</Link>
                                <button type='button' onClick={() => handleDelete(book.id)} className='btn btn-danger btn-sm me-2'>Delete</button>
                            </td>
                        </tr>
                   ) : <h3>No Records Found</h3>
                }
            </tbody>
        </table></div>
    )
}

export default Books