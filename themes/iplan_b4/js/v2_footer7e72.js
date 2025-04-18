document.addEventListener("DOMContentLoaded", function () {
	console.log("rev 31.3");
	const link_bajas = document.getElementById("deeplink_bajas");
	const link_arrepentimiento = document.getElementById("deeplink_arrepentimiento");
	const link_libro = document.getElementById("deeplink_libro");
	AJAXDiasHabiles()
		.then((respuestaFeriados) => {
			let esFeriado = es_feriado(respuestaFeriados);
			console.log("👀 - :8 - .then - esFeriado:", esFeriado);
			console.log("👀 - :8 - .then - horario_laboral:", es_horario_laboral());

			if (esFeriado || !es_horario_laboral()) {
				console.log("👀 - .then - ES FERIADO O NO ES HORARIO LABORAL:");
				link_bajas.style.display = "none";
			}
		})
		.catch((error) => {
			console.error("Error:", error);
		});
	let url = window.location.href;
	let deep_link = url.split("##");
	link_bajas.onclick = function () {
		deep_link = url.split("##");
		document.cookie = "myDeeplink=" + encodeURIComponent(deep_link[1]) + ";path=/miiplanhogar";
		window.location.href = "/miiplan##bajas";
	};
	link_arrepentimiento.onclick = function () {
		deep_link = url.split("##");
		document.cookie = "myDeeplink=" + encodeURIComponent(deep_link[1]) + ";path=/miiplanhogar";
		window.location.href = "/miiplan##arrepentimiento";
	};
	link_libro.onclick = function () {
		deep_link = url.split("##");
		document.cookie = "myDeeplink=" + encodeURIComponent(deep_link[1]) + ";path=/miiplanhogar";
		window.location.href = "/miiplan##librodequejasonline";
	};
});
function es_horario_laboral() {
	const hoy = new Date();
	let diaSemana = hoy.getDay(); //0 = domingo 6 = sabado
	let hour = hoy.getHours();
	let minutes = hoy.getMinutes();
	if (hour >= 9 && (hour < 20 || (hour === 20 && minutes <= 45)) && diaSemana != 0 && diaSemana != 6) return true;
	else return false;
}

function es_feriado(feriadosArray) {
	const isHoliday = (day, month, holidays) => {
		return holidays.some((holiday) => holiday.dia === day && holiday.mes === month);
	};
	const hoy = new Date();
	const dia = hoy.getDate();
	const mes = hoy.getMonth() + 1;

	return isHoliday(dia, mes, feriadosArray);
}
function AJAXDiasHabiles() {
	const hoy = new Date();
	const anoActual = hoy.getFullYear();

	return fetch(`/webService/feriadoApi/feriadoApi.php?year=${anoActual}`).then((response) => {
		if (!response.ok) {
			throw new Error("Error al obtener los datos del API");
		}
		return response.json();
	});
}
