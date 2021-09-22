import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import {useHistory} from "react-router-dom";

function CowList() {

    const history = useHistory();

    const [dataFromServer, setDataFromServer] = useState([{
        id: 0, name: "", birthDate: new Date(), status: false, birthsCount: 0,
        dryDate: new Date(), deathDate: new Date(), milkingDate: new Date(), pinNumber: 0
    }]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:8080/rest/cow',
            );
            setDataFromServer(result.data.content);
        };

        fetchData().then();
    }, []);

    function openViewCow(id) {
        history.push({
            pathname: "/cowdetail/",
            state: {
                cowId: id
            }
        });
    }
    const columns = [
        {
            title: "Id",
            field: "id",
        },
        {
            title: "Name",
            field: "name",
        },
        {
            title: "Birth Count",
            field: "birthCount",
        },
        {
            title: "Pin Number",
            field: "pinNumber"
        },
        {
            title: "Status",
            field: "status",
            type: "boolean"
        },
        {
            title: "Birth Date",
            field: "birthDate",
            type: 'date',
            dateSetting: {
                format: 'dd/MM/yyyy'
            },
        },
        {
            title: "Death Date",
            field: "deathDate",
            type: 'date',
            dateSetting: {
                format: 'dd/MM/yyyy'
            },
        },
        {
            title: "Milking Date",
            field: "milkingDate",
            type: 'date',
            dateSetting: {
                format: 'dd/MM/yyyy'
            },
        },
        {
            title: "Dry Date",
            field: "dryDate",
            type: 'date',
            dateSetting: {
                format: 'dd/MM/yyyy'
            },
        },
        { title: '', render: (rowData) =>
                <div>
                    <button onClick={() => openViewCow(rowData.id)}>Edit</button>
                </div>
        }
    ];
    return (
        <div>
            <MaterialTable
                title="Cow List"
                data={dataFromServer}
                columns={columns}
                options={{search: true, paging: false, filtering: true, exportButton: true}}
            />
        </div>);
}

export default CowList;
