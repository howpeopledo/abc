import React, { useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Box, Checkbox, FormGroup, Grid, InputLabel, makeStyles, MenuItem, Select, Switch, Typography } from '@material-ui/core';
import './ScheduleInfo.scss';
import schedule from '../json/GET/ldap_model_getScheduleInfomation.json';

function ScheduleInfo() {
    const scheduleSchedulerconfig = schedule.schedulerConfig;
    const schedulerOnce = scheduleSchedulerconfig.scheduleOnce;
    const syncInterval = scheduleSchedulerconfig.syncInterval;

    const [syncNow, setsyncNow] = useState(scheduleSchedulerconfig.syncNow.checked);

    //doNotSchedule
    const [doNotSchedule, setdoNotSchedule] = useState(scheduleSchedulerconfig.doNotSchedule.checked);

    //schedule once
    const [scheduleOnce, setscheduleOnce] = useState(schedulerOnce.checked)
    const [dayChange, setdayChange] = useState(schedulerOnce.day);
    const [timeChange, settimeChange] = useState(schedulerOnce.time);

    //syncinterval
    const [syncIntervalChangeChecked, setsyncIntervalChangeChecked] = useState(syncInterval.checked);
    const [syncIntervalChange, setsyncIntervalChange] = useState(syncInterval.interval);

    const [value, setValue] = React.useState('doNotSchedule');

    //---------------------------------------------------------------------------------------------//
    //syncNow section
    const handleSyncnowChange = (event) => {
        setsyncNow(event.target.checked);
    }

    //doNotSchedule section
    const handledoNotScheduleChange = (event) => {
        setdoNotSchedule(event.target.value);
    }

    //ScheduleOnce section
    const handlescheduleOnceChange = (event) => {
        setscheduleOnce(event.target.checked);
    }

    const handleDayChange = (event) => {
        setdayChange(event.target.value);
    }

    const handleTimeChange = (event) => {
        settimeChange(event.target.value);
    }

    //SyncInterval section
    const handleSyncIntervalChecked = (event) => {
        setsyncIntervalChangeChecked(event.target.checked);
    }

    const handleSyncInterval = (event) => {
        setsyncIntervalChange(event.target.value);
    }

    const handleChange = event => {
        console.log(event.target.value);
        setValue(event.target.value);
    };
    //----------------------------------------------------------------------------------------------//

    const AntSwitch = withStyles((theme) => ({
        root: {
            width: 30,
            height: 16,
            padding: 2,
        },
        switchBase: {
            padding: 2,
            color: theme.palette.grey[500],
            '&$checked': {
                transform: 'translateX(12px)',
                color: theme.palette.common.white,
                '& + $track': {
                    opacity: 1,
                    backgroundColor: '#1281dd',
                    borderColor: '#1281dd',
                },
            },
        },
        thumb: {
            width: 12,
            height: 12,
            boxShadow: 'none',
        },
        track: {
            border: `1px solid ${theme.palette.grey[500]}`,
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: theme.palette.common.white,
        },
        checked: {},
    }))(Switch);

    const StyledRadio = withStyles({
        root: {
            '&$checked': {
                color: '#1281dd',
            },
        },
        checked: {},
    })((props) => <Radio disableRipple color="default" {...props} />);

    const BootstrapInput = withStyles((theme) => ({
        root: {
            'label + &': {
                marginLeft: theme.spacing(1),
            },
        },
        input: {
            borderRadius: 2,
            position: 'relative',
            marginLeft: 2,
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #c4c4c4',
            fontSize: 14,
            padding: '6px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                'Open Sans'
            ].join(',')
        },

    }))(InputBase);

    const useStyles = makeStyles((theme) => ({
        select: {
            color: "black",
        },
        icon: { color: "#c4c4c4" },
    }));

    const dropdownuseStyles = makeStyles(theme => ({
        dropdownStyle: {
            background: '#FFFFFF 0% 0 % no - repeat padding- box',
            boxShadow: '0px 1px 6px #00000029',
            border: '1px solid #C4C4C4',
            borderRadius: '2px',
        },
        select: {
            whiteSpace: 'nowrap',
            margin: 0,
            appearance: 'none'
        },
    }));

    const menuProps = {
        getContentAnchorEl: null,
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
        }
    };
    const theme = createMuiTheme({
        props: {
            MuiSelect: {
                MenuProps: menuProps
            }
        }
    });

    const classes = useStyles();
    const dropdownclasses = dropdownuseStyles();

    return (
        <div className="container">
            <div className="holder">
                <div className="form__upper">
                    <Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid style={{ textAlign: 'left', font: 'normal normal normal 14px Open Sans' }} item>Synchronize the selected cabinet details now</Grid>
                            <Grid item>
                                {/* <Switch
                                    color="primary"
                                    name="checkedB"
                                    checked={syncNow}
                                    onChange={handleSyncnowChange}

                                /> */}
                                <AntSwitch checked={syncNow} onChange={handleSyncnowChange} />
                            </Grid>
                        </Grid>
                    </Typography>
                </div>
                <ThemeProvider theme={theme}>
                    <div className="form__down">
                        <FormControl component="fieldset">
                            <RadioGroup column
                                aria-label="schedule_info"
                                name="schedule_info"
                                value={value}
                                onChange={handleChange}
                            >
                                {/* <FormControlLabel
                                    value="start"
                                    control={}
                                    style={{ display: 'flex' }}
                                    label={
                                        <div>
                                            Synchronize the selected cabinet details now
                                        <Switch
                                                color="primary"
                                                name="checkedB"
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                        </div>}
                                /> */}
                                <FormControlLabel
                                    value="doNotSchedule"
                                    control={<StyledRadio color="primary" />}
                                    label={<div>Do not schedule</div>}
                                    labelPlacement="Do_not_schedule"
                                />
                                <FormControlLabel
                                    value="scheduleOnce"
                                    control={<StyledRadio color="primary" />}
                                    style={{ marginTop: 10 }}
                                    label={
                                        <div className="formdown_section">
                                            Sync once in a day on
                                                <FormControl variant="filled">
                                                <Select
                                                    labelId="demo-customized-select-label"
                                                    id="demo-customized-select"
                                                    style={{ width: '148px', marginLeft: 4, marginRight: 6, borderBottom: 'none', padding: '2px 0px 3px 6px' }}
                                                    value={dayChange}
                                                    disableAnimation
                                                    IconComponent={ExpandMoreIcon}
                                                    onChange={handleDayChange}
                                                    input={<BootstrapInput />}
                                                    classes={{
                                                        select: dropdownclasses.select,

                                                    }}

                                                    displayEmpty
                                                >
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="Monday">Monday</MenuItem>
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="Tuesday">Tuesday</MenuItem>
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="Webnesday">Wednesday</MenuItem>
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="Thursday">Thursday</MenuItem>
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="Friday">Friday</MenuItem>
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="Saturday">Saturday</MenuItem>
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="Sunday">Sunday</MenuItem>

                                                </Select>
                                            </FormControl>
                                                at
                                                <FormControl>
                                                <Select
                                                    labelId="demo-customized-select-label"
                                                    id="demo-customized-select"
                                                    style={{ width: '148px', marginLeft: 4, marginRight: 6, borderBottom: 'none', padding: '2px 0px 3px 6px' }}
                                                    value={timeChange}
                                                    disableAnimation
                                                    input={<BootstrapInput />}
                                                    IconComponent={ExpandMoreIcon}
                                                    classes={{
                                                        select: dropdownclasses.select,

                                                    }}

                                                    onChange={handleTimeChange}
                                                    displayEmpty
                                                >
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="05:15AM">5:15 AM</MenuItem>
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="06:15AM">6:15 AM</MenuItem>
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="07:15AM">7:15 AM</MenuItem>
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="08:15AM">8:15 AM</MenuItem>
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="09:15AM">9:15 AM</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>}
                                />
                                <FormControlLabel
                                    value="syncInterval"
                                    control={<StyledRadio color="primary" />}
                                    style={{ marginTop: 10 }}
                                    label={
                                        <div className="formdown_section">Schedule at regular interval
                                                <FormControl>
                                                <Select
                                                    labelId="demo-customized-select-label"
                                                    id="demo-customized-select"
                                                    style={{ width: '148px', marginLeft: 4, marginRight: 6, borderBottom: 'none', padding: '2px 0px 3px 6px' }}
                                                    value={syncIntervalChange}
                                                    input={<BootstrapInput />}
                                                    IconComponent={ExpandMoreIcon}
                                                    onChange={handleSyncInterval}
                                                    classes={{
                                                        select: dropdownclasses.select,

                                                    }}

                                                    displayEmpty
                                                >
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="30mins">30 mins</MenuItem>
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="40mins">40 mins</MenuItem>
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="50mins">50 mins</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>}
                                    labelPlacement="Do_not_schedule"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </ThemeProvider>
                <div className="next-btn">
                    <Button disableRipple variant="outlined">
                        Cancel
                        </Button>
                    <Button disableRipple variant="contained">
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ScheduleInfo;
