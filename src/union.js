const servers = new Map();
let _auth = null;
let ws = null;
let selectedServer = null;
var app = null;
var login = null;

const getDom = obj => {
    if (obj !== undefined && obj !== null)
        return obj.current.ref;
    return undefined;
};

export const handleLogin = (l) => {
    login = l;
    const username = login.username;
    const password = login.password;
    _auth = btoa(`${username}:${password}`);
    localStorage.setItem("token", _auth);
    getDom(login.loginbutton).style.display = 'none';
    connect();
};

export const connect = () => {
    if(!_auth) {
        _auth = localStorage.getItem("token");
    }
    if (login) {
        if (login.overlay)
            login.overlay.current.setState({visible: true});
        
        setTimeout(() => {
            app.setState({screen: "connecting"});
        }, 1000);
    }

    ws = new WebSocket('wss://union.serux.pro:2096');
    ws.onopen = authenticateClient;
    ws.onclose = handleWSClose;
    ws.onmessage = handleWSMessage;
}

export const authenticateClient = () => {
    ws.send(`Basic ${_auth}`);
}

export const handleWSMessage = message => {
    var data = JSON.parse(message.data);
    console.log(data);

    if (data.op == 1) {
        app.setState({screen: "chat"});
    }
}

export const handleWSClose = close => {
    console.log(`Websocket disconnected (${close.code}): ${close.reason}`);

    if (close.code !== 4001) {
        setTimeout(() => connect(_auth), 3e3); // try to reconnect
    } else {
        // disconnected, display login
        console.log(`Logging out...`);
        localStorage.setItem("token", null);
        app.setState({token: "", screen: "login"});
    }
}

export const setApp = a => {
    app = a;
}