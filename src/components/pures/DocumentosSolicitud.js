import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle, faDownload } from '@fortawesome/free-solid-svg-icons';

import Empty from './EmptyScreen';
import Row from './RowPY4';
import SimpleCol from './SimpleColInfo';

const DocumentosSolicitudM = props => {

	const validateDocument = id => {
		props.validateHandle(id)
	}

	const invalidateDocument = id => {
		props.invalidateHandle(id);
	}

	const downloadFile = document => {
		props.downloadHandle(document)
	}

	return(
		<div className = 'container'>
			{ props.documentos.length == 0 &&
			<Empty mt = { 1 } text = 'No se han subido los documentos' />
			}
			{ props.documentos.length > 0 &&
			<React.Fragment>
				{ props.documentos.map(d =>
				<Row key = { d.id }>
					<SimpleCol
						label = 'Documento'
						text = { d.tipo_documento.documento }
					/>
					<SimpleCol
						label = 'Formato'
						text = { d.tipo_archivo }
					/>
					<div className = 'col'>
						<h4 className = 'text-center'>Descargar</h4>
						<div className = 'd-flex justify-content-center align-items-center'>
							<button className = 'btn btn-primary btn-sm'
								onClick = { ()=>downloadFile(d) }
							>
								<FontAwesomeIcon icon = { faDownload } />
							</button>
						</div>
					</div>
					<div className = 'col'>
						<h4 className = 'text-center'>Validado</h4>
						<div className = 'd-flex justify-content-center align-items-center mt-2'>
							{ d.validado &&
							<FontAwesomeIcon icon = { faCheckCircle } className = 'text-success' style = {{ fontSize : '1.6rem' }} />
							}
							{ !d.validado &&
							<FontAwesomeIcon icon = { faTimesCircle } className = 'text-danger' style = {{ fontSize : '1.6rem' }} />
							}
						</div>
					</div>
					<div className = 'col d-flex justify-content-center align-items-center'>
						{ !d.validado &&
						<button className = 'btn btn-primary btn-sm'
							onClick = { () => validateDocument(d.id) }
							disabled = { d.startFetching }
						>
							{ d.startFetching &&
							<div className = 'text-center'><div className = 'spinner-border spinner-border-sm text-light' /></div>
							}
							{ !d.startFetching && 'Marcar como validado' }
						</button>
						}
						{ d.validado &&
						<button className = 'btn btn-primary btn-sm'
							onClick = { () => invalidateDocument(d.id) }
							disabled = { d.startFetching }
						>
							{ d.startFetching &&
							<div className = 'text-center'><div className = 'spinner-border spinner-border-sm text-light' /></div>
							}
							{ !d.startFetching && 'Marcar como no validado' }
						</button>
						}
					</div>
				</Row>
				) }
			</React.Fragment>
			}
		</div>
	)
}

const DocumentosSolicitud = React.memo(DocumentosSolicitudM);

DocumentosSolicitud.propTypes = {
	documentos: PropTypes.arrayOf(PropTypes.object),
	validateHandle: PropTypes.func.isRequired,
	downloadHandle: PropTypes.func.isRequired,
}

export default DocumentosSolicitud;
