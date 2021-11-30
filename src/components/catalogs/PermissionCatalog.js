import React, { useEffect, useState } from 'react';
import {
    TableCell,
    TableRow,
    IconButton,
    TextField,
    FormHelperText
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import GetAppIcon from '@material-ui/icons/GetApp';

import { useDispatch, useSelector } from 'react-redux';

import TableCustom from './TableCustom';
import { ChargeData, Delete, Deleting, Updating } from '../../actions/persistenceActions';
import Toast from '../helpers/Toast';
import ModalCustom from '../helpers/ModalCustom';
import ModalPermissionCreate from './ModalPermissionCreate';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useSearch } from '../../hooks/useSearch';
import { PDFDownloadLink, usePDF } from '@react-pdf/renderer';
import PdfCustom from 'components/pdf/Pdf';

const PermissionCatalog = () => {

    const [
        isSearch,
        search,
        isCreating,
        whereUpdating,
        handleChange,
        reset,
        handleSetValues,
        handleModalopen,
        handleModalClose
    ] = useSearch();

    const dispatch = useDispatch();
    const state = useSelector(state => state.persistence.data);
    const { type, message, isOpen } = useSelector(state => state.toast);

    const [data, setData] = useState([]);

    const schema = yup.object().shape({
        Nombre: yup.string().trim()
            .required(() => <span>Name is required</span>),
        EmpleadoID: yup.number(),
    });
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        dispatch(ChargeData("user/"));
    }, [dispatch]);

    useEffect(() => {
        if (search !== '') {
            setData(
                state.filter((data) =>
                    data.Nombre.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setData(state);
        }
    }, [search, state]);

    const onSubmit = data => {
        console.log(data);
        dispatch(Updating(`user/update/${data.id}`, data));
        // reset();
    }
    const headCells = [
        { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'Nombre', numeric: false, disablePadding: false, label: 'Nombre' },
        { id: 'Email', numeric: false, disablePadding: false, label: 'Correo Electronico' },
        { id: 'FechaInicio', numeric: false, disablePadding: false, label: 'Fecha de registro' },
    ];
    const row = (row, classes) => (
        <TableRow
            hover tabIndex={-1}
            key={row.EmpleadoID}>
            <TableCell component="th" scope="row" padding="none" className={classes.row} style={{ padding: 0, paddingLeft: 16 }}>
                {row.EmpleadoID}
            </TableCell>
            {
                (whereUpdating === row.EmpleadoID)
                    ? <>
                        <TableCell align="left" style={{ padding: 0, paddingLeft: 16 }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input type="hidden" name="id" ref={register} defaultValue={row.EmpleadoID} />
                                <TextField
                                    inputRef={register}
                                    name="Nombre"
                                    defaultValue={row.Nombre} size="small" />
                                <FormHelperText className={classes.error}>
                                    <ErrorMessage errors={errors} name="Nombre" />
                                </FormHelperText>
                            </form>
                        </TableCell>
                        <TableCell align="left" style={{ padding: 0, paddingLeft: 16 }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input type="hidden" name="id" ref={register} defaultValue={row.EmpleadoID} />
                                <TextField
                                    inputRef={register}
                                    name="Email"
                                    defaultValue={row.Email} size="small" />
                                <FormHelperText className={classes.error}>
                                    <ErrorMessage errors={errors} name="Email" />
                                </FormHelperText>
                            </form>
                        </TableCell>
                        <TableCell align="left" style={{ padding: 0, paddingLeft: 16 }}>{row.FechaCreacion}</TableCell>
                    </>
                    : <>
                        <TableCell align="left" style={{ padding: 0, paddingLeft: 16 }}>{row.Nombre}</TableCell>
                        <TableCell align="left" style={{ padding: 0, paddingLeft: 16 }}>{row.Email}</TableCell>
                        <TableCell align="left" style={{ padding: 0, paddingLeft: 16 }}>{row.FechaCreacion}</TableCell>
                    </>
            }
            {
                (whereUpdating === row.EmpleadoID)
                    ? <TableCell align="right" style={{ padding: 0, paddingRight: 16 }}>
                        <IconButton aria-label="filter list" onClick={handleSubmit(onSubmit)} >
                            <DoneIcon style={{ color: '#28A745' }} />
                        </IconButton>
                        <IconButton aria-label="filter list" onClick={handleUpdating(0)} >
                            <ClearIcon style={{ color: '#DC3545' }} />
                        </IconButton>
                    </TableCell>
                    : <TableCell align="right" style={{ padding: 0, paddingRight: 16 }}>
                        <IconButton aria-label="filter list" onClick={handleUpdating(row.EmpleadoID)} >
                            <EditIcon style={{ color: '#FFC107' }} />
                        </IconButton>
                        <IconButton aria-label="filter list" onClick={handleDelete(row.EmpleadoID)} >
                            <DeleteIcon style={{ color: '#DC3545' }} />
                        </IconButton>
                        <IconButton aria-label="filter list">
                            <PDFDownloadLink document={<PdfCustom dato={row}/>} fileName={`CartaRecomendacion_${row.Nombre}.pdf`}>
                                <GetAppIcon sx={{ color: '#222222'}} />
                            </PDFDownloadLink>
                        </IconButton>
                    </TableCell>
            }
        </TableRow>);

    const handleUpdating = (id) => (event) => {
        event.preventDefault();
        if (whereUpdating === 0) {
            handleSetValues({
                isCreating: isCreating,
                whereUpdating: id
            });
        } else {
            handleSetValues({
                isCreating: isCreating,
                whereUpdating: id
            });
        }
    }

    const handleDelete = (id) => (event) => {
        event.preventDefault();
        dispatch(Deleting(`user/remove/${id}`, id));
    }
    const handlePdf = (row) => (event)=> {
        event.preventDefault();
    }
    return (
        <>
            <TableCustom
                name={"Empleados"}
                data={isSearch ? data : state}
                headCells={headCells}
                handleModalopen={handleModalopen}
                handleChange={handleChange}
                rowCustom={row}
            />
            <Toast
                isOpen={isOpen}
                message={message}
                type={type}
            />
            <ModalCustom
                handleModalClose={handleModalClose}
                openModal={isCreating}
                component={ModalPermissionCreate}
            />
        </>
    )
}

export default PermissionCatalog
