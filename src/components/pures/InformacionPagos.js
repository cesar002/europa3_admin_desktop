import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import accouting from 'accounting-js'

import Empty from './EmptyScreen';
import Label from './Badge';

const InformacionPagos = props => {

	return(
		<div className='container'>
			<div className='row my-3'>
				<div className='col-12'>
					{ props.pagos.length <= 0  &&
					<Empty mt = { 1 } text = 'Aún no hay fechas de pago registrados' />
					}
					{ props.pagos.length > 0 &&
					<table className='table table-responsive'>
						<thead>
							<tr>
								<th>Fecha de pago</th>
								<th>Monto a pagar</th>
								<th>Estado</th>
								<th>Metodo de pago</th>
								<th>Referencia de pago</th>
							</tr>
						</thead>
						<tbody>
							{ props.pagos.map(pago =>
							<tr key = {pago.id}>
								<td>{ moment(pago.fecha_pago).format('DD/MM/YYYY') }</td>
								<td>{ accouting.formatMoney(pago.monto_pago) }</td>
								<td>
									<Label
										texto = { pago.pago == null ? 'Pendiente' : 'Pagado' }
										type = { pago.pago == null ? 'secondary' : 'success' }
									/>
								</td>
								<td>{ pago.pago !== null ? pago.pago.metodo_pago.nombre : '' }</td>
								<td>{ pago.pago !== null ? pago.pago.referencia : '' }</td>
							</tr>
							) }
						</tbody>
					</table>
					}
				</div>
			</div>
		</div>
	)
}

InformacionPagos.propTypes = {
	pagos: PropTypes.array.isRequired,
}

export default InformacionPagos;
