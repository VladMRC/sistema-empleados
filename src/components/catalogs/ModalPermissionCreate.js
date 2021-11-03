import React from 'react';
import {
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputBase,
    InputLabel,
    makeStyles,
    withStyles
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { Creating } from '../../actions/persistenceActions';

const ModalPermissionCreate = ({ handleModalClose }) => {

    const dispatch = useDispatch();

    const BootstrapInput = withStyles((theme) => ({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 4,
            // position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            width: 200,
            textAlign: 'left',
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }))(InputBase);

    const useStyles = makeStyles((theme) => ({
        content: {
            padding: theme.spacing(2),
            width: 330,
        },
        header: {
            display: 'flex',
            justifyContent: 'center',
            '& p': {
                fontSize: 24,
                marginBottom: theme.spacing(1),
            },
        },
        body: {
            '& #object': {
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(4),
            },
            '& div': {
                display: 'flex',
                justifyContent: 'center',
                '& #ButtonAdd': {
                    marginBottom: theme.spacing(1),
                    color: 'white',
                    backgroundColor: '#0367A6',
                    textTransform: 'none',
                },
            },

        },
        error: {
            '& span': {
                color: '#bf1650',
                '&::before': {
                    display: 'inline',
                    content: '"⚠ "',
                },
            },
        },
        margin: {
            margin: theme.spacing(1),
        },
    }));
    const classes = useStyles();

    const schema = yup.object().shape({
        Nombre: yup.string().trim()
            .required(() => <span>Name is required</span>)
    });
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = data => {
        // console.log(data)
        dispatch(Creating("user/create", data));
        handleModalClose();
    }

    return (
        <div className={classes.content}>
            <div className={classes.header}>
                <p>Permission Form</p>
            </div>
            <Divider />
            <form onSubmit={handleSubmit(onSubmit)} className={classes.body}>
                <Grid container>
                    <Grid item xs={12}>
                        <FormControl className={classes.margin}>
                            <InputLabel shrink htmlFor="Nombre">Nombre</InputLabel>
                            <BootstrapInput
                                name="Nombre"
                                inputRef={register}
                                placeholder="Nombre" />
                            <FormHelperText className={classes.error}>
                                <ErrorMessage errors={errors} name="Nombre" />
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.margin}>
                            <InputLabel shrink htmlFor="Email">Email</InputLabel>
                            <BootstrapInput
                                name="Email"
                                inputRef={register}
                                placeholder="Email" />
                            <FormHelperText className={classes.error}>
                                <ErrorMessage errors={errors} name="Email" />
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
                <div>
                    <Button
                        id="ButtonAdd"
                        variant="contained"
                        type="submit"
                        startIcon={<AddIcon />}>
                        Add
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ModalPermissionCreate
