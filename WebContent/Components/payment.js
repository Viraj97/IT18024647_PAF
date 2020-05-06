$(document).ready(function() {
	$("#alertSuccess").hide();
	$("#alertError").hide();
});
// SAVE
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	// Form validation-------------------
	var status = validatePaymentForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid------------------------

	var type = ($("#hidPaymentIDSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "PaymentAPI",
		type : type,
		data : $("#formPayment").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onPaymentSaveComplete(response.responseText, status);
		}
	});

});

function onPaymentSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = response;
		if (resultSet.status == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidPaymentIDSave").val("");
	$("#formPayment")[0].reset();
}

// UPDATE==========================================
$(document).on(
		"click",
		".btnUpdate",
		function(event) {

			var payeeID = getPayeeId($(this).closest("tr").find('td:eq(5)')
					.text(), $(this).closest("tr").find('td:eq(6)').text(), $(
					this).closest("tr").find('td:eq(7)').text(), $(this)
					.closest("tr").find('td:eq(8)').text())

			$("#hidPaymentIDSave").val(
					$(this).closest("tr").find('#hidPaymentIDUpdate').val());
			$("#paymentID").val($(this).closest("tr").find('td:eq(0)').text());
			$("#type").val($(this).closest("tr").find('td:eq(1)').text());
			$("#ammount").val($(this).closest("tr").find('td:eq(2)').text());
			$("#paymentHolder").val(
					$(this).closest("tr").find('td:eq(3)').text());
			$("#date").val($(this).closest("tr").find('td:eq(4)').text());
			$("#payeeId").val(payeeID);
		});

function getPayeeId(hospital, doctor, pharmacy, patient) {
	if (hospital != 'null') {
		return hospital;
	}
	if (doctor != 'null') {
		return doctor;
	}
	if (pharmacy != 'null') {
		return pharmacy;
	}
	if (patient != 'null') {
		return patient;
	}
}

// remove
$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "PaymentAPI",
		type : "DELETE",
		data : "PaymentID=" + $(this).data("paymentid"),
		dataType : "text",
		complete : function(response, status) {
			onPaymentDeleteComplete(response.responseText, status);
		}
	});
});

function onPaymentDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = response;
		if (resultSet.status == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}
// CLIENTMODEL=========================================================================
function validatePaymentForm() {
	// CODE
	if ($("#type").val().trim() == "") {
		return "Enter Payment Type.";
	}
	// NAME
	if ($("#ammount").val().trim() == "") {
		return "Enter Amount.";
	}
	// PRICE-------------------------------
	if ($("#paymentHolder").val().trim() == "") {
		return "Enter Payment Holder.";
	}
	// DESCRIPTION------------------------
	if ($("#payeeId").val().trim() == "") {
		return "Enter Payee ID.";
	}
	return true;
}