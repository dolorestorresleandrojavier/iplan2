// JavaScript IPLAN 2021
jQuery(function ($) {
var myURL = window.location.href;
  if(myURL.indexOf("/centro-de-ayuda-liv")!== -1 || myURL.indexOf("/centro-de-ayuda-hogar")!== -1){
    //init values
    var accorded = 0;
    var myCGP;
    var myDef = {
      208 : "Acceso a Zona de Clientes",
      196 : "Almacenamiento Virtual IPLAN" ,
      168 : "Antivirus IPLAN" ,
      194 : "Backup IPLAN",
      156 : "Central Virtual IPLAN",
      170 : "Constructor de Sitios",
      178 : "Data Center IPLAN",
      198 : "DNS IPLAN",
      172 : "Email Marketing IPLAN",
      200 : "Fax",
      210 : "Formas de Pago",
      186 : "Google G Suite",
      188 : "Google Hosting Dedicado",
      207 : "Bienvenido a IPLAN",
      180 : "Internet Percentil",
      162 : "Línea Analógica IPLAN",
      212 : "Modelo de Escalamiento",
      174 : "PC Backup IPLAN",
      220 : "Power Mesh",
      190 : "Servidor Dedicado IPLAN",
      158 : "Servidor Virtual",
      164 : "SMS Full IPLAN",
      220 : "SMS Marketing",
      204 : "Sphone",
      184 : "Telefonía Cloud IPLAN",
      166 : "Trama IPLAN",
      202 : "Video Vigilancia IPLAN",
      206 : "Virtual Datacenter",
      160 : "VoIP IPLAN",
      222 : "Nuevo Producto",
      176 : "Web Hosting IPLAN"
    };

    //chat color changin...
    if(readCookie("userLoggedType")){
      var myUserLoggedType=readCookie("userLoggedType");
    }

    if(myUserLoggedType == 0){
      var checkExist = setInterval(function() {
         if ($('#s1chat_welcome_wrapper').length) {
            console.log("Exists!");
            $("#s1chat_welcome_wrapper").css("background", "#009aa4")
            clearInterval(checkExist);
         }
      }, 100); // check every 100ms
    }

    /* HELPER FUNTIONS */
    function checkWidth() {
        var windowsize = $(window).width();
        console.log("windowsize:"+windowsize);
        return windowsize;
    }

    //Add User Name if logged2020
    if(readCookie("userLogged")){
      var myUserLoggedNAme=readCookie("userLogged");
      $("#loggedUser").html(myUserLoggedNAme);
    }

    // cargar descripción desde el link de la taxonomía.
    function getDesc(calledFrom){ //myUserLoggedType

      myDocID = myURL.split("=");
      //var theSiredID = myDocID[1];
      theSiredID = 207;
      console.log("geting Desc:"+theSiredID);
      //$(".miniAd").css("display", "none");

      var myState = myDef[theSiredID];
      console.log("myState="+myState);
      var loadHolder = $('#descrTAX');

      //loadHolder.load("/Prodlist2021/"+theSiredID+"/ #taxDesc", function(){
      loadHolder.load("/Prodlist2021/"+theSiredID+"/ .field--name-description", function(){
        $("#repTit").html(myState);
        $("#CDAInfo").slideDown(700);

        return(true);
      })
      return(true);

    }

    function stripSpace(str) {
        return str.replace(/^\s+|\s+$/g, '');
    }

    // Read a page's GET URL variables and return them as an associative array.
    function getUrlVars(){
       var vars = [], hash;
       var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
       for(var i = 0; i < hashes.length; i++)
       {
           hash = hashes[i].split('=');
           vars.push(hash[0]);
           vars[hash[0]] = hash[1];
       }
       return vars;
    }

    
    // leer cookie
    function readCookie(name) {

     var nameEQ = name + "=";
     var ca = document.cookie.split(';');

     for(var i=0;i < ca.length;i++) {

       var c = ca[i];
       while (c.charAt(0)==' ') c = c.substring(1,c.length);
       if (c.indexOf(nameEQ) == 0) {
         return decodeURIComponent( c.substring(nameEQ.length,c.length) );
       }

      }

     return null;

    }

    // borrar cookie
    function delete_cookie( name ) {
      document.cookie = name + '=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    // función para reasignar divs en otros lugares (se usa para poner en los correctos divs los libros porque con los templates no se puede)

    function detachattach(what, classif){
      //what es el div que quiero cambiar de lugar y where es el lugar donde quiero que vaya

      $(what).each(function(){
        if(what == ".CDA-2"){
          var tempClasific = $(this).find(classif).text();
          console.log("classific:"+tempClasific);
          if(tempClasific=="Soporte Técnico"){
            myRemovedDiv = $(this).detach();
            myRemovedDiv.appendTo( "#replacerST" );
          }else if(tempClasific=="Detalles del servicio"){
            myRemovedDiv = $(this).detach();
            myRemovedDiv.appendTo( "#replacerDS" );
          }
        }

      })
    }


    function reFAQ(){
      var myFAQHTML =""
      //$(".field--name-field-faq-pregunta").each(function(index){
      $(".paragraph--type--documento-cda-faq").each(function(index){
        var myPreg = $(this).find(".field--name-field-faq-pregunta").text();
        var myResp= $(this).find(".field--name-field-faq-respuesta").html();
        if(myPreg.length > 1 ){
          
          myFAQHTML += '<div class="card-header-preguntas collapsed" data-toggle="collapse" data-parent="#accordion2" href="#collapse'+index+'"><a class="card-title-ayuda">';
          myFAQHTML += myPreg;
          myFAQHTML += '</a>';
          myFAQHTML += '</div>';
          myFAQHTML +='<div id="collapse'+index+'" class="card-body-ayuda collapse" data-parent="#accordion2">';
          myFAQHTML += myResp;
          myFAQHTML +='<p></p><hr><p></p>';
          myFAQHTML += '</div>';
        }

      });
      $("#pregFreqCDA").html(myFAQHTML);
      $(".field--name-field-preguntas-frecuentes-faq-").detach();
    }

    function accordioner(){
        //borrar lo que haya en el selector
        //console.log("ACCORDIONER!!!!!")
        $("#busquedaTema").html('<option vlaue="_">Seleccionar</option>')
  
        // funcion para buscar en los acordeones
        $(".card-header-preguntas-introduccion-nivel3").find(".field--name-field-titulo-de-la-seccion").each(function(index){
            console.log("foundONE!");
          var eltit = $(this).html();//tìtulo del card
          var IDdelAbuelo = $(this).closest(".card-body-ayuda").attr("id");
          var IDdelParent = $(this).closest(".card-header-preguntas-introduccion-nivel3").attr("href");
          $("#busquedaTema").append('<option value="'+IDdelParent+'__'+IDdelAbuelo+'">'+eltit+'</option>');
          console.log(eltit+" _ "+IDdelParent);
        });
  
        $("#busquedaTema").on("change", function(){
          
          var descolapsarRAW = $(this).val();
          var descolapsar = descolapsarRAW.split("__");
          var myself = descolapsar[0];
          var mydad = "#"+descolapsar[1];
          console.log("hay que abrir:"+descolapsar);
          $(".card-body-ayuda").each(function(index){
            var mydata_parent = $(this).attr("data-parent");
            if($(this).hasClass("show") && mydata_parent!="#accordion-introduccion-nivel1"){           
              $(this).removeClass("show");
              //console.log("saqué show tembièn a mi:"+mydata_parent);
            }
          });
          $(myself).addClass("show");
          $(mydad).addClass("show");
          console.log("myself"+myself);
          $(mydad).find(".card-header-preguntas-introduccion-nivel3").each(function(){
           
            if($(this).attr("href")==myself){
              $(this).removeClass("collapsed");
              $(this).attr("aria-expanded", "true");
            }else{
              if(!$(this).hasClass("collapsed")){
                $(this).addClass("collapsed");
                $(this).attr("aria-expanded", "false");
              }
              
            }
          })
          $(".card-header-preguntas-introduccion-nivel2").each(function(){
            if($(this).attr("href")==mydad ){
              $(this).removeClass("collapsed");
              $(this).attr("aria-expanded", "true");
            }else{
              $(this).addClass("collapsed");
              $(this).attr("aria-expanded", "false");
            }
          })
          
          
          //$(mydad).find(".card-header-preguntas-introduccion-nivel3")
          
          
          
        })
    }

    function searchInlink(what){

        $("#busquedaTema").find("option").each(function(index){
            if($(this).text()==what){
                elIDO = $(this).val();
                console.log("elIDO de "+what+" es"+elIDO);
            }
        })
        var descolapsarRAW = elIDO;
        var descolapsar = descolapsarRAW.split("__");
        var myText = descolapsar[0];
        var mydad = "#"+descolapsar[1];
        console.log("hay que abrir:"+descolapsar);
        $(".card-body-ayuda").each(function(index){
          var mydata_parent = $(this).attr("data-parent");
          if($(this).hasClass("show") && mydata_parent!="#accordion-introduccion-nivel1"){           
            $(this).removeClass("show");
            //console.log("saqué show tembièn a mi:"+mydata_parent);
          }
        });
        $(myText).addClass("show");
        $(mydad).addClass("show");
        console.log("myself"+myText);
        $(mydad).find(".card-header-preguntas-introduccion-nivel3").each(function(){
         
          if($(this).attr("href")==myText){
            $(this).removeClass("collapsed");
            $(this).attr("aria-expanded", "true");
          }else{
            if(!$(this).hasClass("collapsed")){
              $(this).addClass("collapsed");
              $(this).attr("aria-expanded", "false");
            }
            
          }
        })
        $(".card-header-preguntas-introduccion-nivel2").each(function(){
          if($(this).attr("href")==mydad ){
            $(this).removeClass("collapsed");
            $(this).attr("aria-expanded", "true");
          }else{
            $(this).addClass("collapsed");
            $(this).attr("aria-expanded", "false");
          }
        })
        
    }

    // Función principal para darle estado inicial al Centro de Ayuda.
    function init(){

      // check on resize
      $(window).resize(function(){
        var nowWidth = checkWidth();
      });

      var nowWidth = checkWidth();

      if(readCookie('iplanUser2020')){
        myCGP=readCookie('iplanUser2020')
        myrealCGP = myCGP.slice(0, -1);
        $("#myBtBk").css("display", "none");
        $("#searchCombo1").css("display", "block");
        $("#headerAyudaBut").css("display", "block");
      }else{
        $("#myBtBk").css("display", "block");
        $("#searchCombo1").css("display", "none");
        $("#headerAyudaBut").css("display", "none");
      }

      // borra los filters provistos
      $(".view-filters").html("");

      // obtener descripción del servicio
      getDesc("now");

      // fill campo loged user
      if (document.cookie.indexOf("iplanUser2020=") >= 0) {
          $("#myCGP").html(readCookie('iplanUser2020'));
      }

      // reordenar los posts
      detachattach(".CDA-2", ".field--name-field-tipo-de-documento");

      // buscador "PRODUCTOS IPLAN"
      $("#edit-documentos").on("change", function(){
        $("#views-exposed-form-centro-de-ayuda-producto-page-1").submit();
      })

      // botón log-in , esto hay que cambiarlo por un login desde acá...
      $("#myBtBk").on("click", function(){
       document.location.href="/zona-de-clientes-2020";
      })

      function rateRespo(param){
        $('.modal-body').html("<h4>Gracias por tu opinión</h4><p>La información que nos acercás, nos sirve para mejorar la calidad del serivicio que te brindamos.</p>");
                                                $('.modal-body').css("font-size","14px");
                                                $('#myModal').modal('show');
                                                $("#poll").css("display", "none");
      }
  
        $("#myBtNo").on("click", function(){
          rateRespo("NO")
        });
  
        $("#myBtSi").on("click", function(){
         rateRespo("SI")
        });

      //reorder FAQ in right column
      reFAQ();

      // crear buesqueda
      setTimeout(
        function() {
            accordioner();
        }, 1000);
      
      $(".myInLinker").on("click", function(){
          var myUriGeller = $(this).attr("id");
          searchInlink(myUriGeller);
      })

    }


    /* INIT */
    init();

  }else{
    // debug para saber que no afectamos al resto del portal
    console.log("bypass CDA");
  }



});
