import React, { Component } from 'react';
import { withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import './Components/gerencia.css';
import AuthService from './services/AuthService';
import NavBar from './helpers/navbar';
import withAuth from './services/withAuth';

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: '#28BBFF',
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);
  
const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);


function createData(title, type, status , link, accept, reject) {
return { title, type, status, link, accept, reject };
}

const rows = [
createData('Criando seu pong', 'Vídeo', 'Pendente'),
createData('Criando seu snake', 'Sítio virtual', 'Aprovado'),
createData('O que é Pygame?', 'Fórum do Yahoo', 'Aprovado'),
];

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  
    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
          <IconButton 
            onClick={handleClose}
            >
            <CloseIcon />
        </IconButton>
            {children}
        </section>
      </div>
    );
  };

const Auth = new AuthService();

class GerenciaLinks extends Component {
    constructor(props){
        super(props);
        this.state = {
            tituloLink:'',
            tipoLink:'',
            statusLink:'',
            modalIsOpen: false,
            show: false,
            error: false,
        }
    }
    showModal = () => {
        this.setState({ show: true });
      }    
    hideModal = () => {
        this.setState({ show: false });
      }

      handleLogout(){
        Auth.logout()
        this.props.history.replace('/');
     }
    render() {
        return (
            <div> 
            <NavBar></NavBar>
            <Typography variant="h3" color="inherit" style={{textAlign: "center", marginTop: "15px"}}>
              Gerenciar Links
            </Typography>
            <Paper className = "style_root" style={{marginTop: "30px"}}>
                <Table className = "style_table">
                <TableHead>
                    <TableRow>
                    <StyledTableCell align="left">TITULO DO LINK</StyledTableCell>
                    <StyledTableCell align="right">TIPO</StyledTableCell>
                    <StyledTableCell align="right">STATUS</StyledTableCell>
                    <StyledTableCell align="right">VISUALIZAR</StyledTableCell>
                    <StyledTableCell align="right">APROVAR</StyledTableCell>
                    <StyledTableCell align="right">REJEITAR</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                    <StyledTableRow key={row.title}>
                        <StyledTableCell component="th" scope="row">
                        {row.title}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.type}</StyledTableCell>
                        <StyledTableCell align="right">{row.status}</StyledTableCell>
                        <StyledTableCell align="right">{row.link}
                        <Modal show={this.state.show} handleClose={this.hideModal} >
                            <div className = "modal-body">
                                <p ><b>Titulo:</b></p>
                                <p ><b>Tipo:</b></p>
                                <p ><b>Link:</b></p>
                            </div>
                        </Modal>
                        <IconButton className="style_button" aria-label="Visualizar" onClick={this.showModal}>
                            <VisibilityIcon />
                        </IconButton>
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.aceitar}
                        <IconButton className="style_button" aria-label="Aceitar">
                            <DoneIcon />
                        </IconButton>
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.rejeitar}
                        <IconButton className="style_button" aria-label="Rejeitar">
                            <CloseIcon />
                        </IconButton>
                        </StyledTableCell>
                    </StyledTableRow>
                    ))}
                </TableBody>
                </Table>
            </Paper>
            </div>
        );
    }
    }
export default withAuth(GerenciaLinks);