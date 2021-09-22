import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CowDetail() {
    const {state} = useLocation();
    const {cowId} = state;

    const [dataFromServer, setDataFromServer] = useState({
        id: 0, name: "", birthDate: new Date(), status: false, birthsCount: 0,
        dryDate: new Date(), deathDate: new Date(), milkingDate: new Date(), pinNumber: 0
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setDataFromServer((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const {id, name, birthDate, status, birthsCount, dryDate, deathDate, milkingDate, pinNumber} = dataFromServer;

    useEffect(() => {

        const fetchData = async () => {
            const result = await axios(
                'http://localhost:8080/rest/cow/byId?id=' + cowId,
            );
            setDataFromServer(result.data.content);
        };
        fetchData().then();
    }, [cowId]);

    return (
        <div>
            <form>
                <div>
                    <input type="hidden" title={"Id"} value={id} onChange={handleChange}/>
                    <input type="text" title={"Name"} value={name} onChange={handleChange}/>
                    <input type="text" title={"Pin Number"} value={pinNumber} onChange={handleChange}/>
                    <input type="text" title={"Births Count"} value={birthsCount} onChange={handleChange}/>
                    <input type="checkbox" title={"Status"} value={status} onChange={handleChange}/>
                </div>
                <div>
                    <DatePicker selected={birthDate} onChange={handleChange} format="yyyy-MM-dd"/>
                    <DatePicker selected={deathDate} onChange={handleChange} format="yyyy-MM-dd"/>
                    <DatePicker selected={milkingDate} onChange={handleChange} format="yyyy-MM-dd"/>
                    <DatePicker selected={dryDate} onChange={handleChange} format="yyyy-MM-dd"/>
                </div>
            </form>
        </div>);
}

export default CowDetail;
