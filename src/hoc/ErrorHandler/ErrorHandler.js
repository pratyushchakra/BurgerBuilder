import React,{Component}from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxillary'
const ErrorHandler = (WrapperComponent,axios) => {
return (props) => {
    return class extends Component {
        state = {
            error: null
        }
        componentDidMount(){
            axios.interceptors.request.use(req =>{
                this.setState({error:null})
                return req
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error:error})
            });
        }
        
        errorConfirmHandler(){
            this.setState({error:null});
        }
        render(){
            return(
                <Aux>
            <Modal show= {this.state.error} clicked = {this.errorConfirmHandler} >
                {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrapperComponent {...this.props}/>
        </Aux>
            )
        }
        
    }
}
}
export default ErrorHandler