import React, { useEffect, useState, useMemo } from 'react';
import TableContainer from './TableContainer';

import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import RiffImage from "./components/RiffImage";

const App = () => {
    const [selectedPitch, setSelectedPitch] = useState("c");
    const [selectedOctave, setSelectedOctave] = useState(0);

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
                Header: 'Name',
                accessor: 'name',
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
            {
                Header: 'Image',
                accessor: d => <RiffImage id={d.id} name={d.image} pitch={selectedPitch} octave={selectedOctave} />
            },
        ],
        []
    );

    return (
        <Container>
            <div>
                <h1 style={{marginTop: "8%", marginLeft: "5%"}}>Scaletrainer</h1>
                <AppBar style={{ background: '#2285d0' }}>
                    <Toolbar>
                        <MusicNoteIcon style={{fill: "white", marginLeft: "2%"}} />
                        <Button style={{marginLeft: "4%"}} color="inherit">Scales</Button>
                        <Button style={{marginLeft: "2%"}} color="inherit">Riffs</Button>
                        <Button style={{marginLeft: "2%"}} color="inherit">Ideabook</Button>
                        <Button style={{marginLeft: "2%"}} color="inherit">Exercises</Button>
                        <AccountCircleIcon style={{fill: "white", marginLeft: "59%"}} />
                    </Toolbar>
                </AppBar>
            </div>
        <Container style={{ marginTop: 40 }}>
            <TableContainer
                columns={columns}
                renderRowSubComponent={renderRowSubComponent}
            />

        </Container>
        </Container>
    );
};

export default App;
