import { Fade, FormControl, MenuItem, Modal, Select, Table, TableBody, Backdrop, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { InputBase, Button } from '@material-ui/core';
import List from "@material-ui/core/List";
import MuiListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import React, { useState, useEffect } from 'react';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import TableContainer from '@material-ui/core/TableContainer';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from "@material-ui/core/Typography";
import NativeSelect from '@material-ui/core/NativeSelect';

import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

import './SyncCabinet.scss';
import groups from '../json/GET/ldap_model_filterDomainList.json';
import organisation from '../json/GET/ldap_model_filterDomainList.json';
import { red } from '@material-ui/core/colors';
import TabSection from '../screens/TabSection';

function SyncCabinet(props) {
    const [open, setOpen] = useState(false);

    //Upper Selected Table Remove Modal
    const [removeModalGroup, setRemoveModalGroup] = useState(false);
    const [removeModalOU, setRemoveModalOU] = useState(false);

    //Imported Groups REMOVE modal
    const [removeImportGroup, setremoveImportGroup] = useState(false);
    const [itemSelectedImportedGroup, setitemSelectedImportedGroup] = useState(0);
    // const [itemSelected, setitemSelected] = useState([]);

    //Imported Organizational Units REMOVE modal
    const [removeImportOU, setremoveImportOU] = useState(false);
    const [itemSelectedImportedOU, setitemSelectedImportedOU] = useState(0);
    // const [itemSelectedOU, setitemSelectedOU] = useState([]);

    //Import All groups and organizational units
    const [removeImportAll, setremoveImportAll] = useState(false);
    const [itemSelectedImportedAll, setitemSelectedImportedAll] = useState(0);
    // const [itemSelectedAll, setitemSelectedAll] = useState([]);

    const [selected, setSelected] = useState('');
    const [selectedOrganization, setselectedOrganization] = useState('');

    let [visible, setVisible] = useState(false);
    let [visibleGroup, setVisibleGroup] = useState('block');
    let [visibleOrganizational, setvisibleOrganizational] = useState('none')

    //left domain list items --> groups
    const [domainListGroupItems, setdomainListGroupItems] = useState(groups.groupsList);

    //left domain list items --> organizational units
    const [domainListOrganizationalUnitsitems, setdomainListOrganizationalUnitsitems] = useState(organisation.organizationalUnitsList);

    //upper table section
    const [selectedtableData, setselectedtableData] = useState([]);
    const removegroup = [...selectedtableData];

    const [selectedOrganizationdata, setselectedOrganizationdata] = useState([]);
    const removeOU = [...selectedOrganizationdata];

    //down table section all groups and organizational units items
    const [importedgroups, setimportedgroups] = useState(groups.groupsList);
    const [importedOrganizationalUnits, setimportedOrganizationalUnits] = useState(organisation.organizationalUnitsList);
    const [importAllGroupsandOrganizationalUnits, setimportAllGroupsandOrganizationalUnits] = useState([]);

    const [searchTerm, setsearchTerm] = useState('');
    const [filteredDomainListGroupItems, setfilteredDomainListGroupItems] = useState([]);
    const [filteredDomainListOrganzationalUnitsItems, setfilteredDomainListOrganzationalUnitsItems] = useState([]);

    const [treeViewChildren, settreeViewChilden] = useState({});

    useEffect(() => {
        if (selectedtableData.length > 0 || selectedOrganizationdata.length > 0) {
            setOpen(true);
        }
        console.log(props);
    }, [props.showModal]);

    useEffect(() => {
        setfilteredDomainListGroupItems(
            domainListGroupItems.filter((group) =>
                group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        setfilteredDomainListOrganzationalUnitsItems(
            domainListOrganizationalUnitsitems.filter((organization) =>
                organization.organizationalUnitName.toLowerCase().includes(searchTerm.toLowerCase()))
        )

        // console.log(JSON.stringify(domainListGroupItems[1].groupsList));
    }, [searchTerm, domainListGroupItems, domainListOrganizationalUnitsitems])

    const handleListItemClick = (event, index) => {
        // setSelectedIndex(index);
        console.log(domainListGroupItems);
        // setdomainListItems([...domainListItems, index]);
        setselectedtableData([...new Set([...selectedtableData, index])]);
        console.log(selectedtableData);
        setVisible(true);

        setSelected(event.target.value);

        // setSelected([domainListGroupItems.groupsList[index].groupImportedAs]);
        // setselectedtableData(tableData[index])
    };

    const handleListItemOrgClick = (event, index) => {
        console.log(domainListOrganizationalUnitsitems);
        setselectedOrganizationdata([...new Set([...selectedOrganizationdata, index])]);
        console.log(selectedOrganizationdata);
        setVisible(true);
        setselectedOrganization(event.target);
    }

    const syncData = () => {
        const groupitems = selectedtableData.map((row) => {
            return {
                groupId: domainListGroupItems[row].groupId,
                groupName: domainListGroupItems[row].groupName,
                groupImportedAs: domainListGroupItems[row].groupImportedAs,
                groupDistinguishName: domainListGroupItems[row].groupDistinguishName,
            }
        });
        const organizationalitems = selectedOrganizationdata.map((row) => {
            return {
                organizationalUnitId: domainListOrganizationalUnitsitems[row].organizationalUnitId,
                organizationalUnitName: domainListOrganizationalUnitsitems[row].organizationalUnitName,
                organizationalUnitImportedAs: domainListOrganizationalUnitsitems[row].organizationalUnitImportedAs,
                organizationalUnitDistinguishName: domainListOrganizationalUnitsitems[row].organizationalUnitDistinguishName
            }
        })
        setimportAllGroupsandOrganizationalUnits([...new Set([...groupitems, ...organizationalitems, ...importAllGroupsandOrganizationalUnits])]);
        // setimportedorganisations([...new Set([...importedorganisations, ...allitems])]);
        setselectedtableData([]);
        setselectedOrganizationdata([]);
        // setOpen(false);
        setVisible(false);
    }

    const handleGroupChange = (event, index) => {
        const newdomainlist = [...domainListGroupItems];
        newdomainlist[index] = {
            ...domainListGroupItems[index],
            groupImportedAs: event.target.value
        }
        console.log(newdomainlist[index]);
        setdomainListGroupItems(newdomainlist);
        // console.log(event.target.value);
    }

    const handleOrgChange = (event, index) => {
        const neworganizationlist = [...domainListOrganizationalUnitsitems];
        neworganizationlist[index] = {
            ...domainListOrganizationalUnitsitems[index],
            organizationalUnitImportedAs: event.target.value
        }
        // setselectedOrganization(event.target.value);
        console.log(neworganizationlist[index]);
        setdomainListOrganizationalUnitsitems(neworganizationlist);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveClose = () => {
        setRemoveModalGroup(false);
    }

    const handleRemoveOUClose = () => {
        setRemoveModalOU(false);
    }

    const onRadioChange = (e) => {
        if (e.target.value == 'organizationalUnits') {
            setvisibleOrganizational('block');
            setVisibleGroup('none');
        } else {
            setvisibleOrganizational('none');
            setVisibleGroup('block');
        }
    }

    const StyledRadio = withStyles({
        root: {
            '&$checked': {
                color: '#1281dd',
            },
        },
        checked: {},
    })((props) => <Radio disableRipple color="default" {...props} />);


    const ListItem = withStyles({
        root: {
            "&$selected": {
                backgroundColor: "#f3f3f3",
            },
            "&$selected:hover": {
                backgroundColor: "#f3f3f3",
            },
            "&:hover": {
                backgroundColor: "#f3f3f3",
            }
        },
        selected: {}
    })(MuiListItem);

    function AccountTree(props) {
        return (
            <SvgIcon fontSize="inherit" style={{ width: 28, height: 28, marginTop: 8 }} {...props}>
                {/* tslint:disable-next-line: max-line-length */}
                <path d="M13.129,7.41V3h-3.9V4.654H5.9V3H2V7.41H5.9V5.756H7.008v5.512H9.234v1.654h3.9V8.512h-3.9v1.654H8.121V5.756H9.234V7.41Z" transform="translate(-0.793 -1.19)" />
            </SvgIcon>
        );
    }

    function GroupExpIcon(props) {
        return (
            <SvgIcon fontSize="inherit" style={{ width: 28, height: 28, marginTop: 8 }} {...props}>
                {/* tslint:disable-next-line: max-line-length */}
                <g xmlns="http://www.w3.org/2000/svg" id="Team_" data-name="Team ">
                    <g id="Group">
                        <g id="Oval">
                            <path class="cls-1" d="M5,5a3,3,0,0,0,.14.9A1.45,1.45,0,0,1,5.23,3a1.31,1.31,0,0,1,.44.07A3,3,0,0,0,5,5Z" /></g></g>
                    <g id="Group_Copy" data-name="Group Copy">
                        <g id="Rectangle-2">
                            <path class="cls-1" d="M14,10.18V11h0v-.82a3.59,3.59,0,0,0-.1-.81A3.1,3.1,0,0,1,14,10.18Z" />
                            <path class="cls-1" d="M13.9,9.37a3.59,3.59,0,0,1,.1.81V11h0v-.82A3.1,3.1,0,0,0,13.9,9.37Z" />
                            <path class="cls-2" d="M13.75,7.16a4.34,4.34,0,0,0-1.35-.91,2.39,2.39,0,0,0,.79-1.79A2.45,2.45,0,0,0,9.43,2.38,3.06,3.06,0,0,0,8,2a2.94,2.94,0,0,0-1.44.37h0l-.27-.14a2,2,0,0,0-.31-.12A1.86,1.86,0,0,0,5.58,2a2,2,0,0,0-.35,0A2.46,2.46,0,0,0,2.78,4.46,2.63,2.63,0,0,0,2.83,5l.06.23s0,0,0,0a2.8,2.8,0,0,0,.3.6,2.16,2.16,0,0,0,.37.43A4.28,4.28,0,0,0,1,10.18V11a1,1,0,0,0,1,1H3v1a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V12h1a1,1,0,0,0,1-1v-.82A4.28,4.28,0,0,0,13.75,7.16ZM10.73,3a1.46,1.46,0,0,1,1.46,1.46A1.44,1.44,0,0,1,10.82,5.9a3,3,0,0,0-.56-2.82A1.5,1.5,0,0,1,10.73,3Zm-4.27.68a2,2,0,0,1,.83-.56h0A1.8,1.8,0,0,1,8,3a2.08,2.08,0,0,1,.71.13,2,2,0,0,1,.82.59A1.94,1.94,0,0,1,10,5a1.77,1.77,0,0,1-.1.61,1.75,1.75,0,0,1-.2.44,1.9,1.9,0,0,1-.34.41A2,2,0,0,1,8.07,7H7.89a2,2,0,0,1-1.27-.52A2.22,2.22,0,0,1,6.25,6a1.81,1.81,0,0,1-.18-.4A2,2,0,0,1,6,5,2,2,0,0,1,6.46,3.68ZM5.23,3a1.31,1.31,0,0,1,.44.07A3,3,0,0,0,5,5a3,3,0,0,0,.14.9A1.45,1.45,0,0,1,5.23,3ZM3.06,11H2v-.82A3.28,3.28,0,0,1,5.23,6.91a2.19,2.19,0,0,0,.36,0h0L5.68,7a2.69,2.69,0,0,0,.43.4A5,5,0,0,0,3.06,11ZM12,13H4V12a3.18,3.18,0,0,1,0-.62A2.33,2.33,0,0,1,4.09,11v0a2.29,2.29,0,0,1,.12-.37.52.52,0,0,1,.06-.16.61.61,0,0,1,0-.12l.08-.16A.83.83,0,0,1,4.5,10s0,0,0,0a2.41,2.41,0,0,1,.23-.36,4.93,4.93,0,0,1,.42-.49,3.37,3.37,0,0,1,.36-.3.19.19,0,0,1,.07-.06l.35-.23a3.06,3.06,0,0,1,.58-.27A2.6,2.6,0,0,1,7,8.12H7l.24-.06L7.67,8H8a1.72,1.72,0,0,1,.32,0h0a2,2,0,0,1,.34,0l.26,0,.08,0,0,0a1.6,1.6,0,0,1,.31.1.67.67,0,0,1,.18.07,2.48,2.48,0,0,1,.37.17,1.08,1.08,0,0,1,.18.11l0,0,.11.06.23.17.25.22a.94.94,0,0,1,.1.1,3.92,3.92,0,0,1,.9,1.39,1.59,1.59,0,0,1,.07.2.83.83,0,0,1,.06.21v0c0,.12.05.24.07.36A3.18,3.18,0,0,1,12,12Zm2-2H12.86a5,5,0,0,0-3-3.65A2.56,2.56,0,0,0,10.23,7l.07-.09a2,2,0,0,0,.43,0,3.25,3.25,0,0,1,2.31,1A.66.66,0,0,1,13.2,8c.06.06.1.12.15.18a1.43,1.43,0,0,1,.14.2.82.82,0,0,1,.12.2l.1.21a2,2,0,0,1,.09.22,3,3,0,0,1,.1.32,3.1,3.1,0,0,1,.11.81Z" /></g>
                        <g id="Oval-2">
                            <path class="cls-1" d="M12.19,4.46A1.44,1.44,0,0,1,10.82,5.9a3,3,0,0,0-.56-2.82A1.5,1.5,0,0,1,10.73,3,1.46,1.46,0,0,1,12.19,4.46Z" /></g></g>
                    <g id="Group-2">
                        <g id="Oval-3">
                            <path class="cls-1" d="M10,5a1.77,1.77,0,0,1-.1.61,1.75,1.75,0,0,1-.2.44,1.9,1.9,0,0,1-.34.41A2,2,0,0,1,8.07,7H7.89a2,2,0,0,1-1.27-.52A2.22,2.22,0,0,1,6.25,6a1.81,1.81,0,0,1-.18-.4A2,2,0,0,1,6,5,2,2,0,0,1,7.29,3.12h0A1.8,1.8,0,0,1,8,3a2.08,2.08,0,0,1,.71.13,2,2,0,0,1,.82.59A1.94,1.94,0,0,1,10,5Z" /></g></g></g>
            </SvgIcon>
        )
    }

    function GroupIcon(props) {
        return (
            <SvgIcon style={{ width: 28, height: 28, marginTop: 8 }} {...props}>
                <g xmlns="http://www.w3.org/2000/svg" id="LDAP_Group_Icon" data-name="LDAP Group Icon" clip-path="url(#clip-LDAP_Group_Icon)">
                    <g id="Mask_Group_43" data-name="Mask Group 43" transform="translate(-467 -277)" clip-path="url(#clip-path)">
                        <g id="Layer_6" data-name="Layer 6" transform="translate(467.334 277.333)">
                            <circle id="Ellipse_1918" data-name="Ellipse 1918" cx="10" cy="10" r="10" transform="translate(1.667 1.667)" fill="#f7c684" />
                            <path id="Path_6954" data-name="Path 6954" d="M12.84,8.262a1.325,1.325,0,1,1-2.638,0,1.25,1.25,0,0,1,1.25-1.312,1.417,1.417,0,0,1,.6.138,1.338,1.338,0,0,1,.788,1.175Z" transform="translate(4.264 2.642)" fill="#1281dd" />
                            <path id="Path_6955" data-name="Path 6955" d="M7.242,8.3a1.25,1.25,0,1,1-1.25-1.25h0A1.25,1.25,0,0,1,7.242,8.3Z" transform="translate(1.538 2.692)" fill="#1281dd" />
                            <circle id="Ellipse_1919" data-name="Ellipse 1919" cx="1.563" cy="1.563" r="1.563" transform="translate(10.129 8.267)" fill="#1281dd" />
                            <path id="Path_6956" data-name="Path 6956" d="M12.817,11.75H6.142a3.417,3.417,0,0,1,.525-1.833h0a3.375,3.375,0,0,1,1.788-1.45h0a3.138,3.138,0,0,1,.975-.125,3.675,3.675,0,0,1,.975.137,3.4,3.4,0,0,1,1.862,1.488h0a3.487,3.487,0,0,1,.55,1.788Z" transform="translate(2.237 3.332)" fill="#1281dd" />
                            <path id="Path_6957" data-name="Path 6957" d="M5.958,11.417a4.088,4.088,0,0,1,.863-2.5H6.408a3,3,0,0,0-.575.063,2.575,2.575,0,0,0-2,2.5H5.958Z" transform="translate(1.083 3.625)" fill="#1281dd" />
                            <path id="Path_6958" data-name="Path 6958" d="M11.721,11.462h2.125a2.638,2.638,0,0,0-2.638-2.637h-.4a4.1,4.1,0,0,1,.917,2.637Z" transform="translate(4.571 3.579)" fill="#1281dd" />
                        </g>
                    </g>
                </g>
            </SvgIcon>
        )
    }

    function OUIcon(props) {
        return (
            <SvgIcon style={{ width: 28, height: 28, marginTop: 8 }} {...props}>
                <g xmlns="http://www.w3.org/2000/svg" id="LDAP_OU_Icon" data-name="LDAP OU Icon" clip-path="url(#clip-LDAP_OU_Icon)">
                    <g id="Group_51815" data-name="Group 51815" transform="translate(-302 -440)">
                        <circle id="Ellipse_2108" data-name="Ellipse 2108" cx="10" cy="10" r="10" transform="translate(304 442)" fill="#1281dd" />
                        <g id="account_tree-24px" transform="translate(307.229 445.229)">
                            <path id="Path_6370" data-name="Path 6370" d="M0,0H13.543V13.543H0Z" fill="none" />
                            <path id="Path_6371" data-name="Path 6371" d="M13.129,7.41V3h-3.9V4.654H5.9V3H2V7.41H5.9V5.756H7.008v5.512H9.234v1.654h3.9V8.512h-3.9v1.654H8.121V5.756H9.234V7.41Z" transform="translate(-0.793 -1.19)" fill="#fff" />
                        </g>
                    </g>
                </g>
            </SvgIcon>
        )
    }

    const useTreeItemStyles = makeStyles(theme => ({
        content: {
            flexDirection: "space-between",
        },
        labelRoot: {
            display: "flex",
            alignItems: "center",
        },
        labelText: {
            fontWeight: "inherit",
            flexGrow: 1,
        },

        root: {
            position: "relative",
            "&:before": {
                pointerEvents: "none",
                content: '""',
                position: "absolute",
                width: 14,
                left: -16,
                top: 14,
                borderBottom: (props) =>
                    // only display if the TreeItem is not root node

                    // only display if the TreeItem has any child nodes
                    props.children?.length > 0
                        ? `1px dashed ${fade(theme.palette.text.primary, 0.4)}`
                        : "none"
            },
        },
        iconContainer: {
            "& .close": {
                opacity: 0.3
            }
        },
        group: {
            marginLeft: 7,
            borderLeft: `1px solid #c4c4c4`
        },

    }));

    const useStyles = makeStyles(theme => ({
        root: {
            width: "100%",
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
            borderBottom: 'none'
        },
        root1: {
            flexGrow: 1,
        }
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
        }
    }));

    const classes = useStyles();
    const dropdownclasses = dropdownuseStyles();


    function StyledTreeItem(props) {
        const classes1 = useTreeItemStyles();
        const { labelText, labelIcon: LabelIcon, ...other } = props;

        return (
            <TreeItem
                label={
                    <div className={classes1.labelRoot}>
                        <LabelIcon color="action" className={classes1.labelIcon} />
                        <Typography variant="body2" className={classes1.labelText}>
                            {labelText}
                        </Typography>
                    </div>
                }
                classes={{
                    root: classes1.root,
                    content: classes1.content,
                    group: classes1.group,
                    iconContainer: classes1.iconContainer
                }
                }
                {...other}
            />
        );
    }

    const BootstrapInput = withStyles((theme) => ({
        root: {
            'label + &': {
                marginTop: theme.spacing(1),
            },
        },
        input: {
            borderRadius: 3,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #c4c4c4',
            fontSize: 14,
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                'Open Sans'
            ].join(',')
        },
    }))(InputBase);

    const removeGroups = () => {
        const removeg = [...importedgroups];
        removeg.splice(itemSelectedImportedGroup, 1);
        setimportedgroups(removeg);
        setremoveImportGroup(false);
    }

    const removeOrgs = () => {
        const removeorg = [...importedOrganizationalUnits];
        removeorg.splice(itemSelectedImportedOU, 1);
        setimportedOrganizationalUnits(removeorg);
        setremoveImportOU(false);
    }

    const removeAllGroupsndOU = () => {
        const removeall = [...importAllGroupsandOrganizationalUnits];
        removeall.splice(itemSelectedImportedAll, 1);
        setimportAllGroupsandOrganizationalUnits(removeall);
        setremoveImportAll(false);
    }

    const handleRemoveDownGroup = () => {
        setremoveImportGroup(false)
    }

    const handleRemoveDownOU = () => {
        setremoveImportOU(false);
    }

    const handleRemoveDownAll = () => {
        setremoveImportAll(false);
    }

    const removeSelectedGroup = (index) => {
        removegroup.splice(index, 1);
        setselectedtableData(removegroup);
        if (removegroup == 0) {
            setVisible(false);
        }
        if (removeOU > 0) {
            setVisible(true);
        }
        setRemoveModalGroup(false);
        // if (selectedtableData.length == 0 || selectedtableData === undefined) {
        //     setVisible(false);
        // } else {
        //     setVisible(true);
        // }
    }

    const removeSelectedOU = (index) => {
        removeOU.splice(index, 1);
        setselectedOrganizationdata(removeOU);
        if (removeOU == 0) {
            setVisible(false);
        }
        if (removegroup > 0) {
            setVisible(true);
        }
        setRemoveModalOU(false);
        // else {
        //     setVisible(false);
        // }
        // if (removeOU == 0 || removegroup > 0) {
        //     setVisible(false);
        // } else if (removegroup > 0) {
        //     setVisible(true);
        // } else {
        //     setVisible(true);
        // }
    }

    const handleTreeSubItems = (node) => {
        console.log(node);
    }

    const renderTree = (row, index) => (
        <StyledTreeItem
            style={{ padding: '3px', marginLeft: 18 }}
            onLabelClick={() => handleListItemOrgClick(row, index)}
            key={row.organizationalUnitId}
            nodeId={row.organizationalUnitId}
            labelText={row.organizationalUnitName}
            labelIcon={AccountTree}
        >
            {/* yaha par treeViewChildren object mai domainGroupList Array h wo h
            abhi aap isko ldap_model_filterDomainList wali file se child bulane ki koshish kariyega */}

            {Array.isArray(domainListOrganizationalUnitsitems.domainGroupList) ? domainListOrganizationalUnitsitems.domainGroupList.map((node) => {
                return (
                    <StyledTreeItem
                        style={{ padding: '3px', marginLeft: 18 }}
                        onLabelClick={() => handleTreeSubItems(node)}
                        key={index}
                        nodeId={index}
                        labelText={node.groupName}
                        labelIcon={AccountTree}
                    >
                        {/* {renderTree(node)} */}  
                    </StyledTreeItem>
                )
            }
            ) : null}
        </StyledTreeItem>
    );

    const removeGroup = (e, item) => {
        // const j = importedgroups.filter((obj) => obj.groupId === item)
        // console.log(j);
        // console.log(item, importedgroups);
        console.log(importedgroups[item]);
        // console.log(e);
        setitemSelectedImportedGroup(item);
        setremoveImportGroup(true);
        // setitemSelected(j);
    }

    const removeOrg = (e, item) => {
        // const j = importedOrganizationalUnits.filter((obj) => obj.organizationalUnitId === item)
        // console.log(j);
        // console.log(e);
        setitemSelectedImportedOU(item);
        // setitemSelectedOU(j);
        setremoveImportOU(true);
    }

    const removeAll = (e, item) => {
        // const h = importedgroups.filter((obj) => obj.groupId === item)
        // const j = importedOrganizationalUnits.filter((obj) => obj.organizationalUnitId === item)
        // console.log(j);
        // console.log(e);
        setitemSelectedImportedAll(item);
        // setitemSelectedAll(j);
        // setitemSelectedAll(h);
        setremoveImportAll(true);
    }

    return (
        <div className="syncCabinet">
            <div className="sidebar" >
                <div className="sidebar__header">
                    <h3>Domain List Items</h3>
                </div>

                <div className="sidebar_radio_group">
                    <RadioGroup row aria-label="position"
                        name="position"
                        defaultValue="groups"
                        onChange={onRadioChange}>

                        <FormControlLabel
                            style={{ marginRight: 35 }}
                            value="groups"
                            control={<StyledRadio color="primary" />}
                            label="Groups" />

                        <FormControlLabel
                            value="organizationalUnits"
                            control={<StyledRadio color="primary" />}
                            label="Organizational Units" />

                    </RadioGroup>
                </div>

                <div className="sidebar__search">
                    <InputBase
                        style={{ marginLeft: 10, bottom: 2 }}
                        onChange={(e) => setsearchTerm(e.target.value)}
                        placeholder="Select or type group"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>

                <div className="sidebar__lists">

                    <div className={classes.root} style={{ display: visibleGroup }}>
                        <div className="group__scroll" style={{ maxHeight: 480 }}>
                            <List component="nav" aria-label="secondary mailbox folder">
                                <>
                                    {
                                        filteredDomainListGroupItems.map((row, index) =>
                                        (
                                            <div key={row.groupId}>
                                                <ListItem
                                                    button
                                                    disableRipple
                                                    onClick={(event) => handleListItemClick(event, index)}
                                                >
                                                    <ListItemText primary={row.groupName} style={{ marginLeft: 12 }} />
                                                </ListItem>
                                            </div>
                                        )
                                        )
                                    }
                                </>
                            </List>
                        </div>
                    </div>
                    <div className="organisationalunits__list" style={{ display: visibleOrganizational }}>
                        <div className="organizational__scroll" style={{ maxHeight: 480 }}>
                            <>
                                {
                                    filteredDomainListOrganzationalUnitsItems.map((row, index) =>
                                    (
                                        <TreeView
                                            className={classes.root1}
                                            defaultExpandIcon={<ArrowDropDownIcon />}
                                            defaultCollapseIcon={<ArrowDropUpIcon />}
                                            defaultEndIcon={<ArrowDropDownIcon />}
                                        >
                                            {renderTree(row, index)}
                                        </TreeView>
                                    )
                                    )
                                }
                            </>
                        </div>
                    </div>
                </div>
            </div>

            <div className="synccabinet__right">
                <div className="synccabinet__table">
                    <div className="table__upper__section" style={{ display: visible ? 'block' : 'none' }}>

                        <Table>
                            <TableHead className="table__head">
                                <TableRow>
                                    <TableCell align="left">Selected Groups/OU</TableCell>
                                    <TableCell align="left">Import as</TableCell>
                                    <TableCell align="left"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {selectedtableData.map((row, index) => (
                                    <TableRow>
                                        <TableCell>
                                            <GroupIcon style={{ marginRight: 5, display: 'inline-flex', verticalAlign: 'bottom' }} />
                                            {domainListGroupItems[row].groupName}
                                        </TableCell>

                                        <TableCell align="left">
                                            <FormControl variant="outlined" size="small" shrink={false}>
                                                <Select
                                                    name="userRoles"
                                                    id="userRoles"
                                                    value={selected}
                                                    disableAnimation
                                                    IconComponent={ExpandMoreIcon}
                                                    defaultValue={domainListGroupItems[row].groupImportedAs}
                                                    name="select_importas"
                                                    input={<BootstrapInput />}
                                                    classes={{
                                                        select: dropdownclasses.select,
                                                    }}
                                                    MenuProps={{
                                                        classes: {
                                                            paper: dropdownclasses.dropdownStyle,
                                                        },
                                                        getContentAnchorEl: null,
                                                        anchorOrigin: {
                                                            vertical: "bottom",
                                                            horizontal: "left"
                                                        }
                                                    }}
                                                    onChange={(e) => handleGroupChange(e, row)}
                                                >
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="Normal">Normal Group</MenuItem>
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="Super">Super Group</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>

                                        <TableCell>
                                            <Button
                                                href="#remove"
                                                color="primary"
                                                disableRipple
                                                onClick={() => setRemoveModalGroup(true)}
                                                style={{ textTransform: "none" }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                    <RemoveCircleOutlineIcon style={{ marginBottom: '4px', width: '14px', height: '14px', marginRight: '2px' }} /> Remove
                                                    </div>
                                            </Button>
                                            <Modal
                                                aria-labelledby="transition-modal-title"
                                                aria-describedby="transition-modal-description"
                                                className="modal__style"
                                                open={removeModalGroup}
                                                onClose={handleRemoveClose}
                                                closeAfterTransition
                                                BackdropComponent={Backdrop}
                                                BackdropProps={{
                                                    timeout: 500,
                                                }}
                                            >
                                                <Fade in={removeModalGroup}>
                                                    <div className="modal__paper">
                                                        <h3 style={{ marginBottom: 2, padding: '13px', marginTop: 2, fontWeight: '900' }}>&nbsp;&nbsp;&nbsp;Remove</h3>

                                                        <p style={{ marginBottom: 30, padding: '17px' }}>Are you sure you want to remove {domainListGroupItems[row].groupName} permanently? </p>

                                                        <form>
                                                            <Button variant="outlined" disableRipple style={{ marginRight: 8, textTransform: "none" }} onClick={handleRemoveClose}>Cancel</Button>
                                                            <Button variant="contained" disableRipple onClick={() => removeSelectedGroup(index)}>
                                                                Remove
                                                            </Button>
                                                        </form>
                                                    </div>
                                                </Fade>
                                            </Modal>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {selectedOrganizationdata.map((row, index) => (
                                    <TableRow>
                                        <TableCell>
                                            <OUIcon style={{ marginRight: 5, display: 'inline-flex', verticalAlign: 'bottom' }} />
                                            {domainListOrganizationalUnitsitems[row].organizationalUnitName}
                                        </TableCell>

                                        <TableCell align="left">
                                            <FormControl variant="outlined">
                                                <Select
                                                    name="userRoles"
                                                    id="userRoles"
                                                    IconComponent={ExpandMoreIcon}
                                                    disableAnimation
                                                    value={selectedOrganization}
                                                    defaultValue={domainListOrganizationalUnitsitems[row].organizationalUnitImportedAs}
                                                    name="select_importas"
                                                    input={<BootstrapInput />}
                                                    classes={{
                                                        select: dropdownclasses.select,

                                                    }}
                                                    MenuProps={{
                                                        classes: {
                                                            paper: dropdownclasses.dropdownStyle,
                                                        },
                                                        getContentAnchorEl: null,
                                                        anchorOrigin: {
                                                            vertical: "bottom",
                                                            horizontal: "left"
                                                        }
                                                    }}
                                                    onChange={(e) => handleOrgChange(e, row)}
                                                >
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="Normal">Normal Group</MenuItem>
                                                    <MenuItem disableRipple style={{ height: '4vh' }} value="Super">Super Group</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>

                                        <TableCell>

                                            <Button
                                                href="#text-buttons"
                                                color="primary"
                                                disableRipple
                                                onClick={() => setRemoveModalOU(true)}
                                                style={{ textTransform: "none" }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                    <RemoveCircleOutlineIcon style={{ marginBottom: '4px', width: '14px', height: '14px', marginRight: '2px' }} /> Remove
                                                    </div>
                                            </Button>
                                            <Modal
                                                aria-labelledby="transition-modal-title"
                                                aria-describedby="transition-modal-description"
                                                className="modal__style"
                                                open={removeModalOU}
                                                onClose={handleRemoveOUClose}
                                                closeAfterTransition
                                                BackdropComponent={Backdrop}
                                                BackdropProps={{
                                                    timeout: 500,
                                                }}
                                            >
                                                <Fade in={removeModalOU}>
                                                    <div className="modal__paper">
                                                        <h3 style={{ marginBottom: 2, padding: '13px', marginTop: 2, fontWeight: '900' }}>&nbsp;&nbsp;&nbsp;Remove</h3>

                                                        <p style={{ marginBottom: 30, padding: '17px' }}>Are you sure you want to remove {domainListOrganizationalUnitsitems[row].organizationalUnitName} permanently? </p>

                                                        <form>
                                                            <Button variant="outlined" disableRipple style={{ marginRight: 8, textTransform: "none" }} onClick={handleRemoveOUClose}>Cancel</Button>
                                                            <Button variant="contained" disableRipple onClick={() => removeSelectedOU(index)}>
                                                                Remove
                                                            </Button>
                                                        </form>
                                                    </div>
                                                </Fade>
                                            </Modal>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </div>

                    <div className="table__down">
                        <TableContainer style={{ maxHeight: 560 }} className="table__container">
                            <Table stickyHeader>
                                <TableHead className="table__head">
                                    <TableRow>
                                        <TableCell align="left">Imported Groups/OU</TableCell>
                                        <TableCell align="left">Imported as</TableCell>
                                        {/* <TableCell style={{ font: 'normal normal 600 16px Open Sans' }} align="left"></TableCell> */}
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {importAllGroupsandOrganizationalUnits.map((row, index) => (
                                        <TableRow key={row.name}>
                                            <TableCell>
                                                {row.groupName ? <GroupIcon style={{ marginRight: 5, display: 'inline-flex', verticalAlign: 'bottom' }} /> : <OUIcon style={{ marginRight: 5, display: 'inline-flex', verticalAlign: 'bottom' }} />}
                                                {row.organizationalUnitName}
                                                {row.groupName}
                                            </TableCell>

                                            <TableCell
                                                align="left"
                                                style={{ font: 'normal normal 600 14px Open Sans' }}>
                                                {row.organizationalUnitImportedAs}
                                                {row.groupImportedAs}
                                            </TableCell>

                                            <TableCell>

                                                <Button
                                                    href="#text-buttons"
                                                    color="primary"
                                                    disableRipple
                                                    onClick={() => removeAll(row, index)}
                                                    style={{ textTransform: "none" }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                        <RemoveCircleOutlineIcon style={{ marginBottom: '4px', width: '14px', height: '14px', marginRight: '2px' }} /> Remove
                                                    </div>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {importedgroups.map((row, index) => (
                                        <TableRow key={row.name}>
                                            <TableCell>
                                                <GroupIcon style={{ marginRight: '5px', display: 'inline-flex', verticalAlign: 'bottom' }} />
                                                {row.groupName}
                                            </TableCell>

                                            <TableCell
                                                align="left"
                                                style={{ font: 'normal normal 600 14px Open Sans' }}>
                                                {row.groupImportedAs}
                                            </TableCell>

                                            <TableCell>
                                                <Button
                                                    href="#text-buttons"
                                                    color="primary"
                                                    disableRipple
                                                    onClick={() => removeGroup(row, index)}
                                                    style={{ textTransform: "none" }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                        <RemoveCircleOutlineIcon style={{ marginBottom: '4px', width: '14px', height: '14px', marginRight: '2px' }} /> Remove
                                                    </div>
                                                </Button>

                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    {/* {importedOrganizationalUnits.map((row, index) => (
                                        <TableRow key={row.name}>
                                            <TableCell>
                                                <OUIcon style={{ marginRight: '5px', display: 'inline-flex', verticalAlign: 'bottom' }}
                                                />
                                                {row.organizationalUnitName}
                                            </TableCell>

                                            <TableCell
                                                align="left"
                                                style={{ font: 'normal normal 600 14px Open Sans' }}>
                                                {row.organizationalUnitImportedAs}
                                            </TableCell>

                                            <TableCell>

                                                <Button
                                                    href="#text-buttons"
                                                    color="primary"
                                                    disableRipple
                                                    onClick={() => removeOrg(row, index)}
                                                    style={{ textTransform: "none" }}
                                                >

                                                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                                        <RemoveCircleOutlineIcon style={{ marginBottom: '4px', width: '14px', height: '14px', marginRight: '2px' }} />
                                                Remove
                                            </div>

                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))} */}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                </div>

                <div className="footer__section">
                    <form>
                        <Button variant="outlined" disableRipple style={{ textTransform: "none" }}>Cancel</Button>
                        <Button variant="contained" disableRipple onClick={syncData}>
                            Synchronize
                        </Button>

                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className="modal__style"
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <div className="modal__paper">
                                    <h3 style={{ marginBottom: 2, padding: '13px', marginTop: 2, fontWeight: '900' }}>&nbsp;&nbsp;&nbsp;Warning!</h3>

                                    <p style={{ marginBottom: 30, padding: '17px' }}>You have unsynchronished data. Would you still like to go back? <br></br>All your unsynchronished data will be lost.</p>

                                    <form>
                                        <Button variant="outlined" disableRipple style={{ marginRight: 8, textTransform: "none" }} onClick={handleClose}>Cancel</Button>
                                        <Button variant="contained" disableRipple onClick={handleClose}>
                                            Continue
                                        </Button>
                                    </form>
                                </div>
                            </Fade>
                        </Modal>

                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className="modal__style"
                            open={removeImportGroup}
                            onClose={handleRemoveDownGroup}
                            animation={false}
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >

                            <div className="modal__paper">
                                <h3 style={{ marginBottom: 2, padding: '13px', marginTop: 2, fontWeight: '900' }}>&nbsp;&nbsp;&nbsp;Remove</h3>

                                <p style={{ marginBottom: 30, padding: '17px' }}>Are you sure you want to remove this {importedgroups[itemSelectedImportedGroup]?.groupName} permanently?</p>

                                <form>
                                    <Button variant="outlined" disableRipple style={{ marginRight: 8, textTransform: "none" }} onClick={handleRemoveDownGroup}>Cancel</Button>
                                    <Button variant="contained" disableRipple onClick={() => removeGroups()}>
                                        Remove
                                    </Button>
                                </form>
                            </div>
                        </Modal>

                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className="modal__style"
                            open={removeImportOU}
                            onClose={handleRemoveDownOU}
                            animation={false}
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >

                            <div className="modal__paper">
                                <h3 style={{ marginBottom: 2, padding: '13px', marginTop: 2, fontWeight: '900' }}>&nbsp;&nbsp;&nbsp;Remove</h3>

                                <p style={{ marginBottom: 30, padding: '17px' }}>Are you sure you want to remove this {importedOrganizationalUnits[itemSelectedImportedOU]?.organizationalUnitName} permanently?</p>

                                <form>
                                    <Button variant="outlined" disableRipple style={{ marginRight: 8, textTransform: "none" }} onClick={handleRemoveDownOU}>Cancel</Button>
                                    <Button variant="contained" disableRipple onClick={() => removeOrgs()}>
                                        Remove
                                    </Button>
                                </form>
                            </div>
                        </Modal>

                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className="modal__style"
                            open={removeImportAll}
                            onClose={handleRemoveDownAll}
                            animation={false}
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >

                            <div className="modal__paper">

                                <h3 style={{ marginBottom: 2, padding: '13px', marginTop: 2, fontWeight: '900' }}>&nbsp;&nbsp;&nbsp;Remove</h3>

                                <p style={{ marginBottom: 30, padding: '17px' }}>Are you sure you want to remove this {importAllGroupsandOrganizationalUnits[itemSelectedImportedAll]?.organizationalUnitName}{importAllGroupsandOrganizationalUnits[itemSelectedImportedAll]?.groupName} permanently?</p>


                                <form>
                                    <Button variant="outlined" disableRipple style={{ marginRight: 8, textTransform: "none" }} onClick={handleRemoveDownAll}>Cancel</Button>
                                    <Button variant="contained" disableRipple onClick={() => removeAllGroupsndOU()}>
                                        Remove
                                    </Button>
                                </form>

                            </div>
                        </Modal>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default SyncCabinet;