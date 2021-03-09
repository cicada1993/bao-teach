const os = require('os')
let port = 9898

function getLocalIP() {
    const network = os.networkInterfaces()
    const keys = Object.keys(network)
    for (let key of keys) {
        if (key.indexOf('VMware') > -1 || key.indexOf('WSL') > -1) {
            // 跳过虚拟机和子系统
            continue
        }
        const netList = network[key]
        for (let netIndex in netList) {
            const net = netList[netIndex]
            if (net.family === 'IPv4' && net.address !== '127.0.0.1' && !net.internal) {
                return net.address
            }
        }
    }
    return 'localhost'
}


module.exports = {
    port,
    getLocalIP
}