var http = require("http"),
    RPCHandler = require("jsonrpc").RPCHandler;
	
var state = {base:true,
			Container1: true,
			Container2: false
			}

console.log("Started DummyMICA with Base:true, Container1:true & Container2:false")
console.log("Waiting for JSON RPC requests on port 8080")
			
// start server
http.createServer(function (request, response) {
    if(request.method == "POST"){
        // if POST request, handle RPC
        new RPCHandler(request, response, RPCMethods, true);
    }else{
        // if GET request response with greeting
        response.end("Hello world!");
    }
}).listen(8080);

// Available RPC methods
RPCMethods = {
    // NB! private method names are preceeded with an underscore
    stop_container: function(rpc, param1){
		if (typeof state[param1.name] == 'undefined'){
			var answere = {container_state:"container unknown"}
		}
		else{
			var answere = {stopped_container:param1.name}
			state[param1.name] = false
		}
		rpc.response(answere);
    },
    start_container: function(rpc, param1){
		if (typeof state[param1.name] == 'undefined'){
			var answere = {container_state:"container unknown"}
		}
		else{
			var answere = {started_container:param1.name}
			state[param1.name] = true
		}
		rpc.response(answere);
    },
    delete_container: function(rpc, param1){ 
		if (typeof state[param1.name] == 'undefined'){
			var answere = {container_state:"container unknown"}
		}
		else{
			var answere = {deleted_container:param1.name}
			delete state[param1.name];
		}
		rpc.response(answere);
    },
	install_container: function(rpc, param1){
		if (typeof state[param1.name] == 'undefined'){
			var answere = {installed_container:param1.name}
			state[param1.name] = true
		}
		else{
			var answere = {container_state:"container already exists"}
		}
		rpc.response(answere);
	},
	get_state: function(rpc, param1){ 
		if (typeof state[param1.name] == 'undefined'){
			var answere = {container_state:"container unknown"}
		}
		else{
			var answere = {container_state:state[param1.name]}
		}
		rpc.response(answere);
    },
    get_containers: function(rpc){
		var answere = state
		rpc.response(answere);
    },
	reboot: function(rpc){
		var answere = null
		rpc.response(answere);
    },
    _private: function(){
        // this method can't be accessed from the public interface
    }
}