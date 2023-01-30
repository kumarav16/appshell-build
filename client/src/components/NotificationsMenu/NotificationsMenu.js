import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';
import ListItems from "../NotificationsMenu/ListItems/ListItems";
import Snackbar from '@material-ui/core/Snackbar';
import MessageContent from "../../frame/MessageContent";
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from 'react-i18next';

const styles = {
    notificationmenu: {
        position: "relative !important",
        float: "right",
        margin: "0 5.1em",
        top: "74px !important",
        width: "328px !important",
        boxShadow: "var(--effect-drop-shadow-elevation-extra-high) !important",
        overflowX: "hidden !important",
        borderRadius: "4px !important",
    }
}

const NotificationsMenu = (props) => {
    const { classes, t } = props;
    const timeFromNow = (startDate) => {
        /* istanbul ignore else*/
        if (moment(startDate).isValid()) {
            return moment(startDate).fromNow();
        } else {
            return "invalid date" //or any similar message
        }
    };
    // initials = (item) => {
    //     if (item.initials) return item.initials
    //     else if (item.createdBy) return (item.createdBy).split(" ").map((n) => n[0]).join("")
    //     else return false
    // },             
    return (
        <MuiThemeProvider>
            <div className="notiWrapper">
                {
                    props.showNotificationsMenu ?
                        <Popover
                            className={classes.notificationmenu}
                            open={props.showNotificationsMenu}
                            onRequestClose={props.toggleNotificationsMenu}
                            animation={PopoverAnimationVertical}
                            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <ListItems
                                t={t}
                                data={props.data}
                                // isMarked={isMarked}
                                // toggleMarked={toggleMarked}
                                // initials={initials}
                                timeFromNow={timeFromNow}
                                isError={props.errorStatus}
                                noNotificationsStatus={props.noNotificationsStatus}
                                initialsColor={props.initialsColor}
                                errorCode={props.errorCode}
                                errorMessage={props.errorMessage}
                                viewNotification={props.viewNotification}
                                count={props.count} />
                        </Popover>
                        : ''
                }
                <Snackbar
                    open={props.viewNotificationError}
                    setOpen={props.viewNotificationError}
                    autoHideDuration={6000}
                    onClose={props.announcementsClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <MessageContent
                        title={t("Error")}
                        message={props.viewNotificationErrorMsg}
                    />
                </Snackbar>
            </div>
        </MuiThemeProvider>
    );
}

export default withTranslation()(withStyles(styles)(NotificationsMenu));
