const WebSocket = require("ws");

const WS_URL = "wss://vln.valiu.dev";
const TIME_INTEVAL_IN_MIN = 10;

function healthCheck() {
  const ws = new WebSocket(WS_URL);

  ws.on("error", function error() {
    console.error("Error in ws connection!");
    reportError();
  });

  ws.on("open", function open() {
    ws.send('{"id":21,"jsonrpc":"2.0","method":"system_health","params":[]}');
    console.log("message sent!");
  });

  ws.on("message", function incoming(data) {
    console.log(data);
    this.close();
  });

  ws.on("close", function close() {
    console.log("disconnected");
  });
}

function reportError() {
  // call the hook of message service to ping!
  console.log("Message sent to server!");
}

async function pingHealth() {
  while (1) {
    try {
      healthCheck();
    } catch (err) {
      console.log("err!");
      reportError();
    } finally {
      await new Promise((resolve) => setTimeout(resolve, TIME_INTEVAL_IN_MIN * 60 * 1000));
    }
  }
}

pingHealth();
