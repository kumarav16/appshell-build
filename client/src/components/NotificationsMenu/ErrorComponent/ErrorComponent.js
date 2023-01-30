import React from 'react';
import '../ErrorComponent/ErrorComponent.css';
import { withTranslation } from 'react-i18next';

const ErrorComponent = (props) => {
    return (
        <>
            <div className="errorWrapper">
                <img src={props.errorImage} alt="Error" />
            </div>
            <div className={`errMsg ${props.ErrMsgClass}`}>{props.msg}</div>
        </>
    )
}

export default withTranslation()(ErrorComponent);