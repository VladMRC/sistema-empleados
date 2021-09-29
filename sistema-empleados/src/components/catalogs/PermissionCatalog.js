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

import { useDispatch, useSelector } from 'react-redux';

import TableCustom from './TableCustom';
import { ChargeData, Deleting, Updating } from '../../actions/persistenceActions';
import Toast from '../helpers/Toast';
import ModalCustom from '../helpers/ModalCustom';
import ModalPermissionCreate from './ModalPermissionCreate';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useSearch } from '../../hooks/useSearch';

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

    const state = useSelector( state => state.persistence.data );
    const { type, message, isOpen } = useSelector( state => state.toast );

    const [data, setData] = useState([]);

    const schema = yup.object().shape({
        Permissionname: yup.string().trim()
            .required( () => <span>Name is required</span> ),
        id: yup.number(),
    });
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {  
        dispatch( ChargeData("permission/permissions/") );
    }, [dispatch]);
    
    useEffect(() => {
        if(search !== ''){
            setData(
                state.filter((data) =>
                    data.Permissionname.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setData( state );
        }
    }, [search, state]);

    const onSubmit = data => {
        console.log(data);
        dispatch( Updating(`permission/${data.id}`, data  ) );
        reset();
    }
    const headCells = [
        { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'Nombre', numeric: false, disablePadding: false, label: 'Nombre' },
        { id: 'Email', numeric: false, disablePadding: false, label: 'Correo Electronico' },
        { id: 'FechaInicio', numeric: false, disablePadding: false, label: 'Fecha de registro' },
    ];
    const row = ( row, classes ) => (
        <TableRow
            hover tabIndex={-1}
            key={row.id}>
            <TableCell  component="th" scope="row" padding="none" className={ classes.row } style={{ padding:0, paddingLeft:16}}>
                {row.id}
            </TableCell>
            { 
                (whereUpdating === row.id)
                    ?   <TableCell align="left" style={{ padding:0, paddingLeft:16}}>  
                            <form onSubmit={ handleSubmit( onSubmit ) }>
                                <input type="hidden" name="id" ref={register} defaultValue={row.id} />
                                <TextField 
                                    inputRef={register}
                                    name="Permissionname"
                                    defaultValue={row.Permissionname} size="small" /> 
                                    <FormHelperText className={ classes.error }>
                                        <ErrorMessage errors={errors} name="Permissionname" />
                                    </FormHelperText>
                            </form> 
                        </TableCell>   
                    :   <TableCell align="left" style={{ padding:0,paddingLeft:16}}>{row.Permissionname}</TableCell>
            }
            {
                (whereUpdating === row.id)
                    ?   <TableCell align="right" style={{ padding:0,paddingRight:16}}> 
                            <IconButton aria-label="filter list" onClick={  handleSubmit( onSubmit ) } >
                                <DoneIcon style={{ color: '#28A745' }}/>
                            </IconButton>
                            <IconButton aria-label="filter list"  onClick={ handleUpdating(0) } >
                                <ClearIcon  style={{ color: '#DC3545' }}/>
                            </IconButton>
                        </TableCell>   
                    :   <TableCell align="right" style={{ padding:0,paddingRight:16}}> 
                            <IconButton aria-label="filter list" onClick={ handleUpdating( row.id ) } >
                                <EditIcon style={{ color: '#FFC107' }}/>
                            </IconButton>
                            <IconButton aria-label="filter list" onClick={ handleDelete( row.id ) } >
                                <DeleteIcon  style={{ color: '#DC3545' }}/>
                            </IconButton>
                        </TableCell>
            }
        </TableRow>);

    const handleUpdating = (id) => ( event ) => {
        event.preventDefault();
        if(whereUpdating === 0){
            handleSetValues({
                isCreating:  isCreating,
                whereUpdating: id
            });
        } else {
            handleSetValues({
                isCreating:  isCreating,
                whereUpdating: id
            });
        }
    }
    
    const handleDelete = ( id ) => ( event ) => {
        event.preventDefault();
        dispatch( Deleting(`permission/${id}`, id) );
    }

    return (
        <>
            <TableCustom 
                name={ "Empleados" }
                data={ isSearch ? data : state }  
                headCells={ headCells} 
                handleModalopen={ handleModalopen }
                handleChange={ handleChange }
                rowCustom={row}
                />
            <Toast 
                isOpen={ isOpen }
                message={ message }
                type={ type }
                />
            <ModalCustom 
                handleModalClose={ handleModalClose }
                openModal={ isCreating }
                component={ ModalPermissionCreate }
                />
        </>
    )
}

export default PermissionCatalog
