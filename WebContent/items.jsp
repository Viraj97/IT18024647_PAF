<%@page import="Controller.PaymentController"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
 
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Payment Details</title>

<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.5.0.min.js"></script>
<script src="Components/items.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-8">
				<h1 class="m-3">Payment details</h1>
				<form id="formPayment" name="formPayment" method="post"
					action="items.jsp">
					Payment ID <input id="paymentID" name="paymentID" type="text"
						class="form-control form-control-sm"> <br>
					Payment Type <input id="type" name="type" type="text"
						class="form-control form-control-sm"> <br> Amount <input
						id="ammount" name="ammount" type="text"
						class="form-control form-control-sm"> <br> Payment
					for? <select id="paymentHolder" name="paymentHolder" type="text"
						class="form-control form-control-sm">
						<option value="Doctor">Doctor</option>
						<option value="Hospital">Hospital</option>
						<option value="Pharmacy">Pharmacy</option>
					</select> <br> Payment Holders ID <input id="payeeId" name="payeeId"
						type="text" class="form-control form-control-sm"> <br>
					Date <input id="date" name="date" type="date"
						class="form-control form-control-sm"> <br> <input
						id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> <input type="hidden"
						id="hidPaymentIDSave" name="hidPaymentIDSave" value="">
				</form>
				<br>
				<div id="alertSuccess" class="alert alert-success"></div>

				<br>
				<div id="alertError" class="alert alert-danger"></div>






				<div id="divItemsGrid">
					<%
						PaymentController paymentObj = new PaymentController();
					out.print(paymentObj.readPayment());
					%>
				</div>



			</div>
		</div>
		<br>
		<div class="row">
			<div class="col-12" id="colStudents"></div>
		</div>
	</div>

</body>
</html>