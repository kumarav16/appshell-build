import React from "react";
import Note from '@material-ui/icons/Assignment';
import Alert from '@material-ui/icons/PowerSettingsNewOutlined';
import Message from '@material-ui/icons/Message';
// import Eye from '@material-ui/icons/VisibilityOutlined';
// import EyeOff from '@material-ui/icons/VisibilityOffOutlined';
import '../ListItems/ListItems.css'
// import { Avatar, ListItemAvatar, ListItemText, ListItem, List, Typography, Button } from "@material-ui/core";
import { ListItemAvatar, ListItemText, ListItem, List, Typography, Button } from "@material-ui/core";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import notificationError from '../../../assets/Nonewnotification.svg';
import _ from "lodash";

const ListItems = (props) => {
    const { data, t } = props;
    const viewAllNotifications = () => {
        let headerMenuConfig = JSON.parse(localStorage.getItem("headerMenuConfig"))
        let viewAllMicroApp = _.find(headerMenuConfig, menu => menu.id === "notifications");

        const context = {
            navigationObject: _.get(viewAllMicroApp, "config.navigationObject", {})
        }
        
        var payloadData = {
            state: { mode: _.get(context, "navigationObject.mode", ""), detail: { payLoad: context.navigationObject } },
            appname: _.get(context, "navigationObject.appName", "")
        }
        window.parent.postMessage(JSON.stringify({ eventType: "navigation", payload: payloadData }));
    };
    return (
        <div className="menuWrapper">
            <div className="listHeader">
                <span>{t("Announcements")}</span>
                {/* <span onClick={props.toggleMarked} style={{color: '#147D64'}}>
                            {
                                props.isMarked ?
                                <span><span><EyeOff /></span><span>Mark all as unread</span></span> :
                                <span><span><Eye /></span><span>Mark all as read</span></span>
                            }
                        </span> */}
            </div>
            {
                !props.noNotificationsStatus ?
                    <List>
                        {data.map((item) => {
                            const components = {
                                'announcement': Note,
                                'alert': Alert,
                                'note': Message
                            },
                            TagName = components[_.get(item, "annoucementData.type", "") ? _.toLower(item.annoucementData.type) : 'announcement'];
                            let isReadClass = _.get(item, "annoucementData.isRead", "") ? 'isRead' : "";
                            return (
                                //for mark all
                                // style={props.isMarked ? {opacity: '0.6'} : {opacity:'1'}}

                                <ListItem key={item.annoucementData.id} className={`menuListItem ${isReadClass}`} onClick={(e) => props.viewNotification(e, item)} >
                                    <ListItemAvatar className="notificationType">
                                        <TagName />
                                    </ListItemAvatar>
                                    <ListItemText primary={
                                        <React.Fragment>
                                            <Typography
                                                style={{
                                                    padding: '0 0 5px',
                                                    fontFamily: 'Poppins',
                                                    fontStyle: 'normal',
                                                    fontWeight: 500,
                                                    fontSize: '12px',
                                                    lineHeight: '12px',
                                                    letterSpacing: '-0.25px',
                                                    color: '#121212'
                                                }}
                                                component="span"
                                                variant="body2"
                                            >
                                                {item.annoucementData.name}
                                            </Typography>
                                        </React.Fragment>
                                    } secondary={
                                        <React.Fragment>
                                            <Typography
                                                style={{
                                                    padding: '0 0 5px',
                                                    fontFamily: 'Noto Sans',
                                                    fontStyle: 'normal',
                                                    fontWeight: 300,
                                                    fontSize: '12px',
                                                    lineHeight: '1.2 !important',
                                                    letterSpacing: '-0.25px',
                                                    color: '#748E88'
                                                }}
                                                component="span"
                                                variant="body2"
                                            >
                                                {item.annoucementData.description}
                                            </Typography>
                                            <Typography
                                                className='notificationTime'
                                                style={{
                                                    display: 'block',
                                                    paddingTop: '5px',
                                                    fontFamily: 'Noto Sans',
                                                    fontStyle: 'normal',
                                                    fontWeight: 'normal',
                                                    fontSize: '12px',
                                                    lineHeight: '12px',
                                                    color: '#748E88',
                                                    opacity: '0.54'
                                                }}
                                                component="span"
                                                variant="body2"
                                            >
                                                {props.timeFromNow(item.annoucementData.createDate)}
                                            </Typography>
                                        </React.Fragment>
                                    } />
                                    {/* {
                                        props.initials(item.annoucementData) ?
                                            <ListItemAvatar className="listInitials" style={{ padding: '0 0 0 15px', width: '32', height: '32' }}>
                                                <Avatar className="userInitials" style={{ background: props.initialsColor }}>{props.initials(item.annoucementData)}</Avatar>
                                            </ListItemAvatar>
                                            : null
                                    } */}
                                </ListItem>
                            )
                        }
                        )
                        }
                    </List>
                    : <ErrorComponent errorImage={notificationError} msg={props.errorMessage} ErrMsgClass="Nothingnew" />
            }
            {
                props.isError &&
                <>
                    <ErrorComponent errorImage={notificationError} msg={props.errorMessage} ErrMsgClass="apiError" />
                    {
                        props.errorCode === "0" && 
                        <div className="errorInfo">
                            <p>{t("errInfo1")}</p>
                            <p>{t("errInfo2")}</p>                 
                        </div>
                    }
                    
                </>
            }
            {
                !props.isError &&
                <div className="viewAll">
                    <Button onClick={()=>viewAllNotifications()}>{t("ViewAll")}</Button>
                </div>
            }        
            </div>
    )
}

export default ListItems;