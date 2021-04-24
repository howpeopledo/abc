import { AppBar, Tab, Tabs, makeStyles } from "@material-ui/core";
import React, { Component, useState } from "react";
import { withRouter, BrowserRouter, Route } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './TabSection.scss';

import SyncCabinet from "../screens/SyncCabinet";
import ScheduleInfo from '../screens/ScheduleInfo';

const useStyles = makeStyles({
    customStyleOnTab: {
        font: 'normal normal 600 16px Open Sans',
        color: 'gray',
        fontWeight: '600',
        textTransform: 'none'
    },
    activeTab: {
        font: 'normal normal 600 16px Open Sans',
        fontWeight: '600',
        color: '#1281DD',
        textTransform: 'none'
    }
})

function TabSection(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [showModal, setshowModal] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <div className="tab__section">
            <div className="arrow__and__tabs">
                <div className="arrowback__icon">
                    <ArrowBackIcon onClick={() => setshowModal(!showModal)} style={{ marginTop: 12,marginLeft:12 }} />
                </div>
                <div className="tabs__section">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        
                        TabIndicatorProps={{
                            style: {
                                border: '1px solid #1281DD',
                                backgroundColor: "#1281DD",
                                height: "2px",
                            }
                        }}
                    >
                        <Tab disableRipple label={<span className={value === 0 ? classes.activeTab : classes.customStyleOnTab}>Synchronize Cabinet</span>} />
                        <Tab disableRipple label={<span className={value === 1 ? classes.activeTab : classes.customStyleOnTab}>Schedule Information</span>} />
                    </Tabs>
                </div>
            </div>
            {/* <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="#1281DD"
                textColor="primary"
                centered="true"
                classes={{ indicator: classes.customStyleOnActiveTab }}
                TabIndicatorProps={{
                    style: {
                        border: '1px solid #1281DD',
                        backgroundColor: "#1281DD",
                        height: "4px",
                    }
                }}>
                <Tab label={<span className={value === 0 ? classes.activeTab : classes.customStyleOnTab}>Tab 1</span>} />
                <Tab label={<span className={value === 1 ? classes.activeTab : classes.customStyleOnTab}> Tab 2</span>} />
                <Tab
                    style={{ textTransform: "none", font: 'normal normal 600 16px/22px Open Sans' }}
                    label="Synchronize Cabinet"
                >
                </Tab>
                <Tab
                    style={{ textTransform: "none", font: 'normal normal 600 16px/22px Open Sans' }}
                    label="Schedule Information"
                >
                </Tab>
            </Tabs> */}
            {value === 0 && <SyncCabinet showModal={showModal}/>}
            {value === 1 && <ScheduleInfo />}
        </div>

    )
}

export default TabSection;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Tab, Tabs } from '@material-ui/core';
// import Sidebar from './Sidebar';
// import SyncCabinet from './SyncCabinet';

// function TabSection() {
//     const { location } = this.props;
//     const { pathname } = location;

//     return (
//         <div>
//             <Tabs value={pathname}>
//                 <Tab label="First tab" containerElement={<Link to="/SideBar" />} value="/my-firs-tab-view">
//                     <Sidebar />
//                 </Tab>
//                 <Tab label="Second tab" containerElement={<Link to="/SyncCabinet" />} value="/my-second-tab-view">
//                     <SyncCabinet />
//                 </Tab>
//             </Tabs>
//         </div>
//     )
// }

// export default TabSection
