import { useAppContext } from '../contexts/AppContext'

import { useNavigate } from 'react-router-dom'

const PageProtectioWrapper = ({ children }) => {

    const { token } = useAppContext();
    const navigate = useNavigate();

    if (!token) {
        navigate("/login")
    } else {
        return (children)
    }
}

export default PageProtectioWrapper