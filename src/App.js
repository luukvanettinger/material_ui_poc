import React, { useEffect, useState, useMemo } from 'react';
import TableContainer from './TableContainer';

import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import RiffImage from "./components/RiffImage";

const App = () => {
    const [data, setData] = useState([]);
    const [selectedPitch, setSelectedPitch] = useState("c");
    const [selectedOctave, setSelectedOctave] = useState(0);
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

    const renderRowSubComponent = (row) => {
        const {
            name,
            image
        } = row.original
        return (
            <Container style={{ width: '18rem', margin: '0 auto' }}>
                <Container>
                    <Container>
                        <strong>{name}</strong>
                        <RiffImage id={image} name={image} pitch={selectedPitch} octave={selectedOctave} />
                    </Container>
                </Container>
            </Container>
        );
    };

    const columns = useMemo(
        () => [
            {
                Header: () => null,
                id: 'expander', // 'id' is required
                Cell: ({ row }) => (
                    <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? <IconButton><VisibilityOffIcon /></IconButton> : <IconButton><VisibilityIcon /></IconButton>}
          </span>
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
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Created',
                accessor: 'created_at',
            },
            {
                Header: 'Image',
                accessor: d => <RiffImage id={d.id} name={d.image} pitch={selectedPitch} octave={selectedOctave} />
            },
        ],
        []
    );

    return (
        <Container style={{ marginTop: 100 }}>
            <TableContainer columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} />
        </Container>
    );
};

export default App;
