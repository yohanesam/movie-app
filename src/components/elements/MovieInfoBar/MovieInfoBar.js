import React from 'react';
import { calcTime, convertMoney } from '../../../helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMoneyBill, faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import './MovieInfoBar.css';
const MovieInfoBar = (props) => (
    <div className="rmdb-movieinfobar">
        <div className="rmdb-movieinfobar-content">
            <div className="rmdb-movieinfobar-content-col">
                <FontAwesomeIcon icon={ faClock } className="fa-time" name="clock-o" size="2x" />
                <span className="rmdb-movieinfobar-info">Running Time :{ calcTime(props.time) }</span>
            </div>

            <div className="rmdb-movieinfobar-content-col">
                <FontAwesomeIcon icon={ faMoneyBill } className="fa-budget" name="clock-o" size="2x" />
                <span className="rmdb-movieinfobar-info">Budget: { convertMoney(props.budget) }</span>
            </div>

            <div className="rmdb-movieinfobar-content-col">
                <FontAwesomeIcon icon={ faTicketAlt } className="fa-revenue" name="ticket" size="2x" />
                <span className="rmdb-movieinfobar-info">Revenue: { convertMoney(props.revenue) }</span>
            </div>
        </div>
    </div>
)

export default MovieInfoBar;