var myCGP = '';
jQuery(function ($) {
	var myURL = window.location.href;

	function delete_cookie(name) {
		document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	}

	if (myURL.indexOf("Zona-de-clientes") !== -1 || myURL.indexOf("zona-de-clientes") !== -1 || myURL.indexOf("miiplan") !== -1) {
		if (myURL.indexOf("zona-de-clientes-2020") == -1 || myURL.indexOf("zona-de-clientes-2020") == -1) {
			processMe("NewZDC");
		} else {
			processMe("NewZDC");
		}
	}

	function processMe(what) {
		switch (what) {
			case "NewZDC":
				if ($('#btnPasswordExpirada')) {
					$('#btnPasswordExpirada').on('click', function () {
						passwordExpirada();
					})
				}
				function passwordExpirada() {
					if (enviarMail.includes("La contraseña expiró")) {
						$.ajax({
							url: "/sendMail/passwordExpired2.php",
							type: "post",
							data: {},
							success: function (response) {
								enviarMail = "";
								$('.modal-body').empty().text('Te enviamos un correo electrónico con los pasos para cambiar tu contraseña. Si no lo recibís en unos minutos, por favor, revisá tu carpeta de correo no deseado o contactanos para obtener ayuda.');
							},
						});
					}
				}

				if (typeof $.cookie("token") === "undefined") {
					if (myURL.indexOf("##") != -1) {
						myDeepLinik = myURL.split("##");
						document.cookie = "myDeeplink=" + encodeURIComponent(myDeepLinik[1]) + ";path=/miiplanliv";
						document.cookie = "myDeeplink=" + encodeURIComponent(myDeepLinik[1]) + ";path=/miiplanliv_d";
					} else {
						delete_cookie("myDeeplink");
					}
				} else {
					if (myURL.indexOf("##") != -1) {
						delete_cookie("myDeeplink");
						myDeepLinik = myURL.split("##");
						document.cookie = "myDeeplink=" + encodeURIComponent(myDeepLinik[1]) + ";path=/miiplanliv";
						document.cookie = "myDeeplink=" + encodeURIComponent(myDeepLinik[1]) + ";path=/miiplanliv_d";
					} else {
						delete_cookie("myDeeplink");
					}
				}

				function loginFormUnhide(status) {
					if (status == "unlock") {
						$("#edit-password").prop("disabled", false);
						$("#Pas-ref").prop("disabled", false);
						$("#Pas-ref").css("display", "block");
						//lockedStat = "unlocked";
						myCGP = $("#edit-usuario").val(); // now cookieThis
						getMyEmail(myCGP);
						$("#CHpWD").fadeIn("fast");
					} else {
						$("#CHpWD").fadeOut("fast");
						$("#uncoverCHPW").fadeOut("fast");
						$("#edit-password").prop("disabled", true);
						$("#Pas-ref").prop("disabled", false);
						$("#Pas-ref").css("display", "block");
						var mySecHtmlModal =
							'<div class="mmTit">&nbsp;</div><div class="mmText">Tu <span class="redMe">contraseña</span> y <span class="redMe">Nº de CGP</span>(código de gestión personal) 1 se encuentran en el mail de <b>Bienvenida/o a IPLAN</b> que te enviamos oportunamente.</div>';
						mySecHtmlModal +=
							'<div class="mmText">Si necesitás <b>recuperar tu contraseña</b>, por favor completá el campo "NÚMERO CGP" y te enviaremos un mail a tu cuenta de contacto principal con las instrucciones.</div>';
						$("#myZDCMod2").html(mySecHtmlModal);
						$("#myZDCMod2").slideUp("fast", function () { });
						//lockedStat = "locked";
						myCGP = $("#edit-usuario").val();
					}
				}

				function getMyEmail(user) {
					$.ajax({
						url: "/login_unificado/getmailFromUser.php",
						type: "post",
						data: { myUserID: user },
						success: function (response) {
							myEmail = response;
							var mySecHtmlModal =
								`<div class="mmTit">&nbsp;</div>
									<div class="mmText v2_text_12_regular v2_color_grey-dark">Tu 
									<span class="redMe">contraseña</span> 
									y <span class="redMe">Nº de CGP</span>
									(código de gestión personal) se encuentran en el mail de <span class="mmText v2_text_12_regular v2_color_grey-dark">Bienvenida/o a IPLAN</span> que te enviamos oportunamente.
								</div>`;
							mySecHtmlModal += '<div class="mmText v2_text_12_regular v2_color_grey-dark">Podemos enviarte un mail con info de recuperación de contraseña a tu cuenta de contacto principal.</div>';
							mySecHtmlModal += '<div class="mmText2"  style="margin-top:16px;display: flex;align-items: center;justify-content: center;padding-right: 21px;"><input type="button" value="ENVIAR" class="paddedB v2_button_magenta_white" id="sendMailMe"></div>';
							$("#myZDCMod2").html(mySecHtmlModal);
							$("#sendMailMe").on("click", function () {
								$.ajax({
									url: "/sendMail/recoverPassword2.php",
									type: "post",
									data: { mCGP: $('#edit-usuario').val() },
									success: function (response) {
										var myTerHtmlModal = '<div class="mmTit">&nbsp;</div><div class="mmText v2_text_14_regular v2_color_grey-dark">Hemos enviado un mail con información de recuperación de contraseña a tu cuenta de contacto principal.</div>';
										$("#myZDCMod2").html(myTerHtmlModal);
									},
								});
							});
						},
					});
				}
				// 1st minimodal content
				var myfirstHtmlModal = `
				<div class="mmTit">&nbsp;</div>
				<div class="mmText v2_text_12_regular v2_color_grey-dark ">Si sos cliente, ahora podés loguearte con tu DNI.
					<br>
					Tu código de Gestión Personal
					<span class="redMe-v2 v2_text_12_bold v2_color_grey-dark"> (CGP) </span> es el que recibiste en el mail de <span class="v2_text_12_bold v2_color_grey-dark">Bienvenida/o a IPLAN</span>.
				</div>`;
				myfirstHtmlModal += `<div class="mmText v2_text_12_regular v2_color_grey-dark">También podés encontrarlo en la parte superior de tus facturas.
				</div>`;
				myfirstHtmlModal += `<div class="mmText v2_text_12_regular v2_color_grey-dark">
					Obtenelo a través del chat o contactándonos por <a href="https://wa.me/541150320000" id="headerWABut2" target="_blank"><span class="redMe-v2">Whatsapp</span></a>.
				</div>`;
				// 2nd minimodal content
				var mySecHtmlModal = `
					<div class="mmTit">&nbsp;</div>
					<div class="mmText v2_text_12_regular v2_color_grey-dark">
						Tu <span class="redMe-v2 v2_text_12_bold v2_color_grey-dark">contraseña</span>y 
						<span class="redMe-v2 v2_text_12_bold v2_color_grey-dark">Nº de CGP</span>
						(código de gestión personal) se encuentran en el mail de <span class="v2_text_12_bold v2_color_grey-dark">Bienvenida/o a IPLAN</span> que te enviamos oportunamente.
					</div>`;
				mySecHtmlModal += `<div class="mmText v2_text_12_regular v2_color_grey-dark">
					Si necesitás<span class="v2_text_12_bold v2_color_grey-dark">recuperar tu contraseña</b>, por favor completá el campo "NÚMERO CGP" y te enviaremos un mail a tu cuenta de contacto principal con las instrucciones.
				</div>`;


				$("#myZDCMod1").html(myfirstHtmlModal);
				$("#myZDCMod2").html(mySecHtmlModal);

				// button rawDirections
				$("#CGP-ref").on("click", function () {
					$("#myZDCMod1").slideToggle("fast", function () { });
				});

				$("#Pas-ref").on("click", function () {
					$("#myZDCMod2").slideToggle("fast", function () { });
				});

				//WORKING 2
				$("#edit-usuario").keyup(function (e) {
					inputValue = $(this).val();
					inputValue = inputValue.replace(/\D/g, "");
					$(this).val(inputValue);

					var myNumCharLength = inputValue.length;
					if (myNumCharLength > 6) {
						getMyEmail(inputValue);
						loginFormUnhide("unlock");
					} else {
						loginFormUnhide("lock");
					}
				});

				$("#btnIngresar").on("click", function (event) {
					const username = $("#edit-usuario").val();
					const password = $("#edit-password").val();

					if (username.length > 6 || password.length > 1) {
						$("#loaderLogin").css({
							display: "flex",
							"align-items": "center",
							"justify-content": "center",
						});
						$(this).hide();
					}
					//prevent default
					event.preventDefault();
					console.log("prevent default64");
					var encodedUser = username;
					var encodedPass = password;

					$("#edit-usuario").css("color", "transparent");
					$("#edit-password").css("color", "transparent");
					$("#formL1").submit();
				});

				var myToggleState = "closed";
				$("#activateCHPW").on("click", function () {
					//console.log("uncoverPWCH!");
					$("#uncoverCHPW").slideToggle("fast", function () {
						if (myToggleState == "closed") {
							// is opened now
							$("#uncoverCHPW").css("display", "flex");
							$("#uncoverCHPW").css("flex-direction", "column");
							myToggleState = "opened";
						} else {
							// is closed now
							myToggleState = "closed";
						}
					});
				});

				function autochangePass() {
					$("#myModal").modal("hide");
					let searchParams = new URLSearchParams(window.location.search);
					var myCGPFromCookie = searchParams.get("us");
					$("#edit-usuario").val(myCGPFromCookie);
					$("#uncoverCHPW").slideToggle("fast", function () {
						if (myToggleState == "closed") {
							// is opened now
							$("#uncoverCHPW").css("display", "flex");
							$("#uncoverCHPW").css("flex-direction", "column");
							myToggleState = "opened";
						} else {
							// is closed now
							myToggleState = "closed";
						}
					});
				}
				// Change contraseña
				// detect if password was filled
				$("#lastPwd").on("input", function () {
					var myCompletedText = $(this).val().length;
					//console.log("this is my content length "+myCompletedText);
					if (myCompletedText > 1) {
						$("#edit-password2").prop("disabled", false);
						$("#edit-password2").removeClass("campoApgado");
					} else {
						$("#edit-password2").prop("disabled", true);
						$("#edit-password2").addClass("campoApgado");
					}
				});

				//duplicate contraseña
				var verboseLevel = "";
				var secLevel;

				function checkMePas(thePass) {
					var re1 = /[A-Z]/;
					var re2 = /[0-9]/;
					var re3 = /[#?!@$%^&*-.=:;,]/;

					var qpasverb = [];
					if (thePass.search(re1) == -1) {
						qpasverb.push("1 mayúscula");
					}
					if (thePass.length < 8) {
						qpasverb.push("8 caracteres");
					}
					if (thePass.search(re2) == -1) {
						qpasverb.push("1 número");
					}
					if (thePass.search(re3) == -1) {
						qpasverb.push("1 símbolo (#?!@$%^&*-.=:;,)");
					}
					qpaschek = qpasverb.length;
					if (qpaschek == 0) {
						return "¡Cumple los requisitos!";
						//console.log("Debería ser 0:"+qpaschek);
					} else {
						var myMsgret = "Debe contener al menos ";
						if (qpaschek == 1) {
							myMsgret += qpasverb[0] + ".";
							//console.log("Debería ser 1:"+qpaschek);
						} else {
							for (i = 0; i < qpaschek; i++) {
								if (i < qpaschek - 2) {
									//console.log("Debería heber más de 2:"+qpaschek);
									myMsgret += qpasverb[i] + ", ";
								} else if (i < qpaschek - 1) {
									// console.log("Debería ser anteúltimo:"+qpaschek);
									myMsgret += qpasverb[i];
								} else {
									//console.log("Debería el último :"+qpaschek);
									myMsgret += " y " + qpasverb[i] + ".";
								}
							}
						}

						return myMsgret;
					}
				}
				$("#edit-password2").on("input", function () {
					var myStrongPassword = $(this).val();
					var myReq = checkMePas(myStrongPassword);
					$("#Pas-new2").html(myReq);
					if (myReq != "¡Cumple los requisitos!") {
						//console.log(myReq);
						verboseLevel = "muy riesgoso";
						$("#Pas-new").css("color", "#ff0000");
						$("#Pas-new").html("Nivel de seguridad: " + verboseLevel);
						unlockPWD("no");
					} else {
						$resultContr = zxcvbn(myStrongPassword);
						//console.log("resultados: "+$resultContr.feedback.warning+" seguridad"+$resultContr.score);
						secLevel = $resultContr.score;

						switch (secLevel) {
							case 0:
								verboseLevel = "muy riesgoso.";
								$("#Pas-new").css("color", "#ff0000");
								$("#Pas-new").html("Nivel de seguridad: " + verboseLevel);
								unlockPWD("no");
								break;
							case 1:
								verboseLevel = "riesgoso, agregue caracteres.";
								$("#Pas-new").css("color", "#ff0000");
								$("#Pas-new").html("Nivel de seguridad: " + verboseLevel);
								unlockPWD("no");
								break;
							case 2:
								verboseLevel = "vulnerable, agregue caracteres.";
								$("#Pas-new").css("color", "rgb(255, 207, 0)");
								$("#Pas-new").html("Nivel de seguridad: " + verboseLevel);
								unlockPWD("no");
								break;
							case 3:
								verboseLevel = "aceptable.";
								$("#Pas-new").css("color", "rgb(12, 152, 0)");
								$("#Pas-new").html("Nivel de seguridad: " + verboseLevel);
								unlockPWD("si");
								break;
							case 4:
								verboseLevel = "muy seguro!";
								$("#Pas-new").css("color", "rgb(12, 152, 0)");
								$("#Pas-new").html("Nivel de seguridad: " + verboseLevel);
								unlockPWD("si");
								break;
						}
					}
				});

				$("#edit-password3").on("input", function () {
					val1 = $("#edit-password2").val();
					val2 = $(this).val();
					if (val1 == val2) {
						$("#Pas-new2").html("¡Las contraseñas coinciden! Presiona el botón CAMBIAR.");
						$("#chpwdLU").prop("disabled", false);
						$("#chpwdLU").on("click", function () {
							$("#chpwdLU").prop("disabled", true);
							//console.log("sent to LU!");
							$("#Pas-feedback").html("Aguarde unos instantes...");
							var myLastPW = $("#lastPwd").val();
							var myUserA = $("#edit-usuario").val();
							// sendTo handler
							$.ajaxSetup({
								error: function (jqXHR, textStatus, errorThrown) {
									if (jqXHR.status === 0) {
										$("#Pas-feedback").html("No se puede conectar: Verifique el estado de la Red.");
									} else if (jqXHR.status == 404) {
										$("#Pas-feedback").html("No se puede procesar la petición  [404]");
									} else if (jqXHR.status == 500) {
										$("#Pas-feedback").html("Error Interno [500].");
									} else if (textStatus === "parsererror") {
										$("#Pas-feedback").html("Requested JSON parse failed.");
									} else if (textStatus === "timeout") {
										$("#Pas-feedback").html("Time out error.");
									} else if (textStatus === "abort") {
										$("#Pas-feedback").html("Ajax request aborted.");
									} else {
										$("#Pas-feedback").html("Uncaught Error: " + jqXHR.responseText);
									}
								},
							});

							$.ajax({
								url: "/login_unificado/sendPWToLU.php",
								type: "post",
								data: { actualP: myLastPW, newP: val2, MyUser: myUserA },
								success: function (response) {
									//console.log("Done!");
									var myTerHtmlModal = response;

									if (myTerHtmlModal.indexOf("contrase&ntilde;a no son v&aacute;lidos!") != -1) {
										myTerHtmlModal = "El DOCUMENTO / CGP o contrase&ntilde;a no son v&aacute;lidos!";
										$("#Pas-feedback").html(myTerHtmlModal);
										$("#chpwdLU").prop("disabled", false);
									} else {
										$("#uncoverCHPW").slideToggle("fast");
										alert("La contraseña fue cambiada!");
									}
								},
							});
						});
					} else {
						$("#Pas-new2").html("Las contraseñas todavía no coinciden.");
						$("#chpwdLU").prop("disabled", true);
					}
				});

				function unlockPWD(stat) {
					if (stat == "si") {
						$("#revealCopyP").fadeIn("fast");
						//console.log("you should see me!");
					} else {
						$("#revealCopyP").fadeOut("fast");
					}
				}

				$("#headerZonaBut").addClass("blueMeHover");
				$("#headerContBut").addClass("blueMeHover");
				$("#headerAyudaBut").addClass("blueMeHover");


				break;

		}
	}
});

document.addEventListener("DOMContentLoaded", function () {
  const dniInput = document.getElementById("edit-usuario");
  const passwordInput = document.getElementById("edit-password");

  if (dniInput && passwordInput) {
    dniInput.addEventListener("input", function () {
      passwordInput.disabled = dniInput.value.trim().length === 0;
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const cgpHelpBtn = document.querySelector("#CGP-ref span");
  const passwordHelpBtn = document.querySelector("#Pas-ref span");
  const cgpHelpBox = document.getElementById("myZDCMod1");
  const passwordHelpBox = document.getElementById("myZDCMod2");

  if (cgpHelpBox) cgpHelpBox.style.display = "none";
  if (passwordHelpBox) passwordHelpBox.style.display = "none";

  function toggleBox(box) {
    if (!box) return;
    box.style.display = box.style.display === "block" ? "none" : "block";
  }

  if (cgpHelpBtn && cgpHelpBox) {
    cgpHelpBtn.addEventListener("click", function () {
      toggleBox(cgpHelpBox);
      if (passwordHelpBox) passwordHelpBox.style.display = "none";
    });
  }

  if (passwordHelpBtn && passwordHelpBox) {
    passwordHelpBtn.addEventListener("click", function () {
      toggleBox(passwordHelpBox);
      if (cgpHelpBox) cgpHelpBox.style.display = "none";
    });
  }
});
