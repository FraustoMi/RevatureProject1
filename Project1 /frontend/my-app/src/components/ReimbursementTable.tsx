import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Reimbursement } from '../Interfaces/Reimbursement';

const API_URL = "http://localhost:8080/reimbursements";


const ReimbursementTable = () => {

    const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);

    const fetchReimbursements = async () => {
        try{
          const response =  await axios.get(API_URL);
          setReimbursements(response.data);
        }catch (error){
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchReimbursements();
    },[]);

    return (
        <div>
            <h1>Reimbursement List</h1>
            <table>
                <thead>
                    <tr>
                    <th>R_ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>User</th>
                    </tr>
                </thead>
                <tbody>
                        {reimbursements.map(r => (
                    <tr key={r.r_id}>
                    <td>{r.r_id}</td>
                    <td>{r.description}</td>
                    <td>{r.amount}</td>
                    <td>{r.stat}</td>
                    <td>{JSON.stringify(r._user.username)}</td>
                    </tr>
                             ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReimbursementTable;