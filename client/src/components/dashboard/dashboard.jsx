import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getProfile, deleteAccount } from '../../redux/actions/profile.action';
import Spinner from '../layouts/spinner';
import DashboardAction from './dashboardAction';
import Experience from './experience';
import Education from './education';


const Dashboard = ({ getProfile, auth: { user }, profile:{ loading, profile }, deleteAccount }) => {

    useEffect(() => {
        getProfile()
    }, [getProfile])

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary" >Dashboard</h1>
        <p className='lead'><i className="fas fa-user" /> Welcome {user && user.name }</p>
        {
            profile && profile !== null ? 
            <Fragment>
                <DashboardAction />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
            </Fragment>
            : 
            <Fragment>
                <p>You have not setup a profile. please add some info</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
            </Fragment>
        }
        <button className='btn btn-danger my-2' onClick={() => deleteAccount()}>
            delete Account
        </button>
        
    </Fragment>
}

Dashboard.propTypes = {
    getProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getProfile, deleteAccount })(Dashboard);
