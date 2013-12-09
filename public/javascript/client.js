var socket = io.connect();

function addMessage(msg, pseudo) {
	$("#chatEntries").append('<div class="message"><p>' + pseudo + ' : ' + msg + '</p></div>');
}

function sentMessage() {
	var $input = $( '#messageInput' );

	if ( $input.val() != "")
	{
		socket.emit('message', $input.val());
		addMessage($input.val(), "Me", new Date().toISOString(), true);
		$input.val('');
	}
}

function setPseudo() {
	var $input = $("#pseudoInput");

	if ($input.val() != "")
	{
		socket.emit('setPseudo', $input.val());
		$('#chatControls').show();
		$('#pseudoInput').hide();
		$('#pseudoSet').hide();
	}
}

socket.on('message', function(data) {
	addMessage(data['message'], data['pseudo']);
});

$(function() {
	$("#chatControls").hide();
	$("#pseudoSet").click(function() {setPseudo()});
	$("#submit").click(function() {sentMessage();});
});