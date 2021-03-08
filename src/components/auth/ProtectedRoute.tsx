import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Route ,Redirect} from 'react-router-dom';
import { RootStore } from '../../store/store';

interface IProps{
    path:string;
    component:React.FC;
    exact:boolean|undefined;
}
const ProtectedRoute:React.FC<IProps> = (props) => {
    const user = useSelector((state: RootStore) => state.user.user);
    return (
        <Fragment>
        {
            user ? 
            <Route path={props.path} component={props.component} exact={props.exact}/>
            :
            <Redirect to="/"/>
        }
        </Fragment>
    )
}

export default ProtectedRoute
