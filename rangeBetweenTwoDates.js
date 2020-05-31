/* Validation between two dates with datetimerpicker -> https://xdsoft.net/jqplugins/datetimepicker/ */
    
$("#DateInitial, #DateEnd").val(" "); // Clean inputs when load page 

let DateInitial = $("#DateInitial");
let DateEnd = $("#DateEnd");
var dateNow = new Date();
let btnSend = $("#btnSend");

/* click start clear end  */
DateInitial.on("click", function(){
  DateEnd.val(" ");
  DateInitial.datetimepicker({ 
      onShow:function( ct ){
      this.setOptions({
          onClose: function($input){
              dateAllowPlusOne($input);
          }
      });
  }, 
  format: 'd-m-Y H:i',
  'minDateTime': new Date(),
  'minDate': -0,
  'closeOnDateSelect' : true,
  'validateOnBlur' : true,
  });
});
  
function dateAllowPlusOne(dateStart){
    if(DateInitial.val()==""){
        DateInitial.focus();
        return false;
  }

  DateEnd.datetimepicker({
      format: 'd-m-Y H:i',
      'minDate': -0,
      startDate: dateStart,
      'closeOnDateSelect' : true,
      'validateOnBlur' : true,
      'minDateTime': new Date()
  });

  DateEnd.attr("disabled", false);
}
/* Persistence date validation */
btnSend.on("click", function(e){
  e.preventDefault();
  $form = $(this).parents().find("form#servicesForm");

  let dTStartArray = DateInitial.val().split(" ");
  let dTEndArray = DateEnd.val().split(" ");
  
  let dateInicialTimestamp = Math.round(new Date(dTStartArray[0].split("-")[2] + "-" + dTStartArray[0].split("-")[1] + "-" + dTStartArray[0].split("-")[0] + " " + dTStartArray[1]) / 1000); // get timestamp DateInitial

  let dateEndTimestamp = Math.round(new Date(dTEndArray[0].split("-")[2] + "-" + dTEndArray[0].split("-")[1] + "-" + dTEndArray[0].split("-")[0] + " " + dTEndArray[1]) / 1000); // get timestamp DateEnd
  
  let nowTimestamp = Math.round(new Date() / 1000); // get timestamp today

  var message = {};
  var error = true;

  / * Validates that today's date is greater than the chosen dates * /
  if((dateInicialTimestamp  < nowTimestamp && dateEndTimestamp  < nowTimestamp ))
  {
      message.title = "Error - Selected dates";
      message.content = "The chosen dates are less than the current date";

  }else if(dateInicialTimestamp < nowTimestamp)
  {
      message.title = "Error - Start Date";
      message.content = "An initial data is inferior to the current data";     

  }else if(dateEndTimestamp < nowTimestamp)
  {
      message.title = "Error - Final date";
      message.content = "The end date is less than the current date";   

  }else if(dateInicialTimestamp > dateEndTimestamp)
  {
      mensagem.title = "Error - Invalid date";
      message.content = "The start date is greater than the end date";  
	  
  }else{
	  
      error = false;
	  
  }
  message.content = message.content + ", choose valid dates to proceed...";

  if(error) modal_warning(message.title, message.content);
  else $form.submit();

 }); 

function modal_warning(title,content,callback){
    modal_confirm({title: title, content: content, callback: callback});
}
