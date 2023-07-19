import { Injectable } from '@angular/core'
import { AvalPayService } from 'src/app/services/avalpay.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})

export class Avalpay {

	urilocation: any;
	localStorageTransaction: any;

	constructor(
		private router:Router,
		private AvalPayService: AvalPayService) { }

	paymentAvalPay = (module: string, paymentData: object, amount: number, invoiceType: number, portalURL: string, desc: string) => {

		//Eliminamos el local Storage
		if (localStorage.getItem(`${module}-transaction-status`)) {
			localStorage.removeItem(`${module}-transaction-status`);
		}
		//Creamos la data para el localStorage
		const localStorageTransactionData: object = {
			data: paymentData,
			trnStatus: false
		}
		//Creamos la transaccion en el localStorage
		localStorage.setItem(`${module}-transaction-status`, JSON.stringify(localStorageTransactionData));
		//Propagamos la alerta
		Swal.fire({
			title: 'Serás redireccionado a la pagina correspondiente...',
			html: 'Espera un momento...',
			timer: 4000,
			didOpen: () => {
				Swal.showLoading();
				this.AvalPayService.makePayment(amount, invoiceType, portalURL, desc).subscribe(response => {
					this.urilocation = response.message.RefInfo[0].RefType;
				});
			},
			willClose: () => {
				window.location.href = this.urilocation;
			}
		});
	}

	validateTransactions( pmtId:string, paymentfunction: () => void, willCloseSwal: () => void, navigateTo: string, module: string ){
    //Obtenemos el id de la transaccion
			this.AvalPayService.makePaymentStatus(pmtId).subscribe(response => {

				// let trnStatus = 'Aprobada';//PRUEBAS
				let trnStatus = response.message.InvoicePmtInfo.PmtStatus.StatusDesc;
				let localStorageTransaction:any = localStorage.getItem(`${module}-transaction-status`);
				this.localStorageTransaction = JSON.parse(localStorageTransaction);
				
				if(trnStatus == 'Aprobada' && this.localStorageTransaction.trnStatus != true ){
					//Ejecutando la funcion de pago
					paymentfunction();
					//Mostramos la alerta
					Swal.fire(
						'Transaccion Exitosa!',
						`#${pmtId} El pago de tu pensión fue ${trnStatus}`,
						'success'
					).then((result) => {
						
							let trnNewStatus = this.localStorageTransaction.trnStatus = true;
							localStorage.setItem(`${module}-transaction-status`, JSON.stringify(this.localStorageTransaction));
              //Ejecutando la funcion opcional al cerrar la alerta
              willCloseSwal();
			  
							setTimeout(() => {
								Swal.fire({
									title: 'Información',
									text: 'Drígete al módulo de descarga de documentos.',
									icon: 'info',
									confirmButtonText: 'OK',
								  });
								
								this.router.navigate([`${navigateTo}`]);
							}, 1000);
					});
					
				}else{
					Swal.fire(
						'Hubo un error en la transacción!',
						`#${pmtId} El pago de tu pensión fue ${trnStatus}`,
						'error'
					).then((result) => {
						setTimeout(() => {
							this.router.navigate([`${navigateTo}`]);
						}, 1000);
				})
				}

			});
  }
}


