import React, { useEffect, useState, useMemo } from 'react';
import TableContainer from './TableContainer';

import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Image from "material-ui-image";


const App = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const doFetch = async () => {
            const response = await fetch('https://api.improviser.education/v1/exercises/scales');
            const body = await response.json();
            const contacts = body;
            console.log(contacts);
            setData(contacts);
        };
        doFetch();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: "View Scale",
                id: "id",
                accessor: d => (
                    <div>
                        <IconButton><VisibilityIcon /></IconButton>
                    </div>
                ),
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Image',
                accessor: d => (
                    <div>
                        <Image src={d.image} />
                    </div>
                ),
            },
            {
                Header: 'Bars',
                accessor: 'number_of_bars',
            },
            {
                Header: 'Chord',
                accessor: 'chord',
            },
            {
                Header: 'Created',
                accessor: 'created_at',
            },
        ],
        []
    );

    return (
        <Container style={{ marginTop: 100 }}>
            <TableContainer columns={columns} data={data} />
        </Container>
    );
};

export default App;
