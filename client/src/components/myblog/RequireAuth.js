import React  from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

export default function requireAuth(WrappedComponent) {
    class AuthenticatedComponent extends React.Component {
        constructor(props) {
            super(props)
        }

        componentWillMount() {
            this.checkAuth()
        }

        checkAuth() {
            if(!this.props.user.userName || !this.props.user.token) {
                this.props.history.push('/login')
            }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }

    const mapStateToProps = (state) => {
        return {
            user: state.currentUser
        }
    }
    
    return connect(mapStateToProps)(withRouter(AuthenticatedComponent))
}